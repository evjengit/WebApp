/* import { Result } from "hono/router";

type ProjectRepository = {
    list: (query?: Record<string, string>) => Promise<Result<string[]>>;
    create: (data: Record<string, string>) => Promise<Result<string[]>>;
}
export const createProjectRepository = (db: unknown): ProjectRepository => {
    return {
        list(query) {},
        create(data) {},
    };
};

export const projectRepository = createProjectRepository({}) */