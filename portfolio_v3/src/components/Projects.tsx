import ProjectCard from "./ProjectCards";
import UseProjects from "../hooks/UseProject";

export default function Projects() {
  const { projects } = UseProjects();

  return (
    <section id="projects">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
