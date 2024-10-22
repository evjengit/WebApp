import type { Result } from "../data/types";
import {
  projectRepository,
  type ProjectRepository,
} from "./project.repository";

import {
  validateCreateProject,
  validateUpdateProject,
  type CreateProject,
  type Project,
  type ProjectResponse,
  type UpdateProject,
} from "./project.schema";

import { createProject, createProjectResponse } from "./project.mapper";
import type { Query } from "../lib/query";

export const createProjectService = (projectRepository: ProjectRepository) => {
  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    return projectRepository.getById(id);
  };

  const list = async (query?: Query): Promise<Result<ProjectResponse[]>> => {
    const result = await projectRepository.list(query);
    if (!result.success) return result;

    return {
      ...result,
      data: result.data.map(createProjectResponse),
    };
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    const project = createProject(data);

    if (!validateCreateProject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }
    return projectRepository.create(project);
  };

  const update = async (data: UpdateProject) => {
    const validation = validateUpdateProject(data);

    if (!validation.success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }

    return projectRepository.update(data);
};

  const remove = async (id: string) => {
    return projectRepository.remove(id);
  };

  return {
    list,
    create,
    update,
    getById,
    remove,
  };
};

export const projectService = createProjectService(projectRepository);

export type ProjectService = ReturnType<typeof createProjectService>;