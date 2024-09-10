import { Project } from "./types";

export default function ProjectCard(project: Project) {

    return(
        <article>
            <h3>${project.name}</h3>
            <div className="project-wrapper">
                <img src="${project.image}" alt="${project.name}">
                <div className="project-content">
                    <p>${project.description}</p>
                    <a href="${project.repoUrl}" target="_blank">View Repository</a>
                    <p>Opprettet: ${project.dateCreated.toLocaleDateString()}</p>
                </div> 
            </div>
        </article>
    )
  }