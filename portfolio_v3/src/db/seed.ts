import { readFile } from "fs/promises";
import { join } from "path";
import { Project, User } from "../data/types";
import { DB } from "./db";

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
        INSERT INTO projects (id, name, description, image, repoUrl, dateCreated, publishedAt, public, status, tags, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            JSON.stringify(project.tags),
            project.user_id)
      }
    })();
  };