import ProjectCard from "./ProjectCards";
import useProjects from "../hooks/useProject";

export default function Projects() {
  const { projects } = useProjects();

  return (
    <section id="projects">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
