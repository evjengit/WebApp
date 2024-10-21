import { Result } from "../data/types";
import { db, type DB } from "../db/db"
import type {
  CreateProject,
  Project,
  UpdateProject,
} from "./project.schema";
import { fromDb, toDb } from "./project.mapper";
import type { Query } from "../lib/query";

export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const project = await exist(id);
      if (!project)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as Project;
      return {
        success: true,
        data: fromDb(data),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av project",
        },
      };
    }
  };

  const list = async (params?: Query): Promise<Result<Project[]>> => {
    try {
      const { name, pageSize = 10, page = 0 } = params ?? {};

      const offset = (Number(page) - 1) * Number(pageSize);

      const hasPagination = Number(page) > 0;

      let query = "SELECT * FROM projects";
      query += name ? `WHERE name LIKE '%${name}%'` : "";
      query += pageSize ? ` LIMIT ${pageSize}` : "";
      query += offset ? ` OFFSET ${offset}` : "";

      const statement = db.prepare(query);

      const data = statement.all() as Project[];

      const { total } = db
        .prepare("SELECT COUNT(*) as total from projects")
        .get() as {
        total: number;
      };

      const totalPages = Math.ceil(total / Number(pageSize ?? 1));
      const hasNextPage = Number(page) < totalPages;
      const hasPreviousPage = Number(page ?? 1) > 1;

      return {
        success: true,
        data: data.map(fromDb),
        ...(hasPagination
          ? {
              total: data.length,
              pageSize,
              page,
              totalPages,
              hasNextPage,
              hasPreviousPage,
            }
          : {}),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av projecter",
        },
      };
    }
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    try {
      const project = toDb(data);

      const query = db.prepare(`
        INSERT INTO projects (id, name, description, repoUrl, dateCreated)
        VALUES (?, ?, ?, ?, ?)
      `);

      query.run(
        project.id,
        project.name,
        project.description,
        project.repoUrl,
        project.dateCreated
      );
      return {
        success: true,
        data: project.id,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppretting av project",
        },
      };
    }
  };

  const update = async (data: UpdateProject): Promise<Result<Project>> => {
    try {
       if (!data.id) {
            return {
                success: false,
                error: { code: "BAD_REQUEST", message: "Project id is required" },
            };
            }
      const projectExist = await exist(data.id);

      if (!projectExist)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };

      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET name = ?, description = ?, image = ?, repoUrl = ?, publishedAt = ?, public = ?, status = ?
        WHERE id = ?
      `);

      query.run(
        project.name,
        project.description,
        project.image,
        project.repoUrl,
        project.publishedAt,
        project.public,
        project.status,
        project.id
    );
      return {
        success: true,
        data: fromDb(project),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppdatering av project",
        },
      };
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const project = await exist(id);
      if (!project)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);
      return {
        success: true,
        data: id,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med sletting av project",
        },
      };
    }
  };

  return { create, list, getById, update, remove };
};

export const projectRepository = createProjectRepository(db);

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
