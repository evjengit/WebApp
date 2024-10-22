import ProjectCard from "./ProjectCards";
import UseProjects from "../hooks/UseProject";
import { Project } from "../features/project.schema";

interface ProjectsProps {
  projects: Project[];
  updateProject: (id: string, updatedData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export default function Projects({ projects, updateProject, deleteProject }: ProjectsProps) {

  return (
    <section id="projects">
      {projects?.map((project) => (
        <ProjectCard 
        key={project.id}
        project={project} 
        updateProject={updateProject} 
        deleteProject={deleteProject}/>
      ))}
    </section>
  );
}
