import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  repoUrl: z.string(),
  dateCreated: z.coerce.date(),
  publishedAt: z.coerce.date().nullable(),
  puclic: z.boolean().default(false),
  status: z.string().default("Draft"),
  tags: z.array(z.string())
});

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;

export type ProjectStatus = "Draft" | "Published"