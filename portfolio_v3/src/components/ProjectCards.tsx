import { Project } from "../features/project.schema"; 
import { format } from "date-fns"

export default function ProjectCard({ project }: { project: Project }) {
    let date = new Date(project.dateCreated)
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
            <p>Opprettet: {format(date, "dd/MM/yyyy")}</p>
            <button id="publish-project" type="submit">Publish</button>
            <button id="delete-project" type="submit">Delete</button>
          </div>
        </div>
      </article>
    );
  }