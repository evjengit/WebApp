import { DB } from "./db";

export const createTables = (db: DB) => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            name TEXT NOT NULL,
            admin INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          repoUrl TEXT NOT NULL,
          dateCreated TEXT NOT NULL,
          publishedAt TEXT,
          public INTEGER NOT NULL,
          status TEXT NOT NULL,
          tags TEXT NOT NULL,
          user_id TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(user_id);
      `);
    };