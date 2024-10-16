import { Project } from "../data/types";
import { format } from "date-fns"

export default function ProjectCard({ project }: { project: Project }) {
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
            <p>Opprettet: {format(project.dateCreated, "dd/MM/yyyy")}</p>
            <button id="publish-project" type="submit">Publish</button>
          </div>
        </div>
      </article>
    );
  }