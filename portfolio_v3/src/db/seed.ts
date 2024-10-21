import { readFile } from "fs/promises";
import { join } from "path";
import { User } from "../data/types";
import { DB } from "./db";
import { Project } from "../features/project.schema";

export const seed = async (db: DB) => {
    const path = join(import.meta.dirname, "data.json");
    const file = await readFile(path, "utf-8");
    const { users, projects } = JSON.parse(file) as {
      users: User[];
      projects: Project[];
    };
  
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, name, admin) VALUES (?, ?, ?, ?)
    `);

    const insertProject = db.prepare(`
        INSERT INTO projects (id, name, description, image, repoUrl, dateCreated, publishedAt, public, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
  
    db.transaction(() => {
      for (const user of users) {
        insertUser.run(
            user.id, 
            user.email, 
            user.name, 
            user.admin);
      }
      for (const project of projects) {
        insertProject.run(
            project.id, 
            project.name, 
            project.description, 
            project.image, 
            project.repoUrl, 
            project.dateCreated, 
            project.publishedAt, 
            project.public, 
            project.status,
            project.user_id)
      }
    })();
  };