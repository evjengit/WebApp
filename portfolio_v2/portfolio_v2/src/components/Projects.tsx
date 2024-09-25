import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { type Project } from "./types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch("http://localhost:3999/projects")
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjects(data);
      })
      .catch((error: Error) => {
        console.error("Feil ved henting av data fra serveren:", error);
      });
  };

  useEffect(() => {
    loadProjects();
  }, [projects]);

  return (
    <section id="projects">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
