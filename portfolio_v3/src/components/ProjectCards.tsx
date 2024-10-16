import { Project } from "./types";
import { format } from "date-fns"

export default function ProjectCard({ project }: { project: Project }) {
  const formattedDate = format(project.dateCreated, "dd/MM/yyyy")
    return (
      <article>
        <h3>{project.name}</h3>
        <div className="project-wrapper">
          <img src={project.image} alt={project.name} />
          <div className="project-content">
            <p>{project.description}</p>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              View Repository
            </a>
            <p>Opprettet: {formattedDate}</p>
          </div>
        </div>
      </article>
    );
  }