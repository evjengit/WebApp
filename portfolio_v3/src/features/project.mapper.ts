import type { Project, ProjectResponse } from "./project.schema";

export const createId = () => {
  return crypto.randomUUID();
};

export const createProjectResponse = (project: Project): ProjectResponse => {

  return {
    id: project.id ?? createId(),
    name: project.name ?? "",
    description: project.description ?? "",
    image: project.image ?? "",
    repoUrl: project.repoUrl ?? "",
    dateCreated: project?.dateCreated ?? "",
    publishedAt: project?.publishedAt ?? "",
    public: project?.public ?? "1",
    status: project?.status ?? "Draft",
    user_id: project?.user_id ?? ""
  };
};
  
  export const fromDb = (project: Project) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      image: project.image,
      repoUrl: project.repoUrl,
      dateCreated: project.dateCreated,
      publishedAt: project.publishedAt,
      public: project.public,
      status: project.status,
      user_id: project.user_id
    };
  };

  export const createProject = (project: Partial<Project>): Project => {
    return {
      id: project.id ?? createId(),
      name: project.name ?? "",
      description: project.description ?? "",
      image: project.image && project.image.trim() !== "" ? project.image : "https://www.celoxis.com/cassets/img/pmc/project-management.png",
      repoUrl: project.repoUrl ?? "",
      dateCreated: project?.dateCreated ?? new Date().toISOString(),
      publishedAt: project?.publishedAt ?? null,
      public: project?.public ?? "1",
      status: project?.status ?? "Draft",
      user_id: project?.user_id ?? "1"
    };
  };
  
  export const toDb = (data: Partial<Project>) => {
    const project = createProject(data);
  
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      image: project.image,
      repoUrl: project.repoUrl,
      dateCreated: project.dateCreated,
      publishedAt: project.publishedAt || null,
      public: project.public === "1" ? "1" : "0",
      status: project.status,
      user_id: project.user_id
    };
  };