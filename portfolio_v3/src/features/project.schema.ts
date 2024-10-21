import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    repoUrl: z.string(),
    dateCreated: z.string(),
    publishedAt: z.string().nullable(),
    public: z.string(),
    status: z.string(),
    user_id: z.string()
  });

export const ProjectCreateSchema = ProjectSchema.omit({ 
    });

export const UpdateProjectSchema = ProjectSchema.partial();

export const ProjectResponseSchema = ProjectSchema.omit({
})

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProject = z.infer<typeof ProjectCreateSchema>
export type UpdateProject = z.infer<typeof UpdateProjectSchema>
export type ProjectStatus = "Draft" | "Published"
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>


export const validateCreateProject = (data: unknown) => {
    return ProjectCreateSchema.safeParse(data);
  };

export const validateProject = (data: unknown) => {
return ProjectSchema.safeParse(data);
};

export const validateUpdateProject = (data: unknown) => {
    return UpdateProjectSchema.safeParse(data)
};