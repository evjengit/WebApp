import { useState } from "react";
import ProjectCard from "./ProjectCard"
import { type Project } from "./types"

export default function Projects () {

    const [projects, setProjects] = useState([])

    function loadFromApi() {
        fetch("http://localhost:3999")
          .then((response) => response.json())
          .then((data: Project) => {
              projects.push(data);
              updateProjectsList();
          })
          .catch((error: Error) => {
            console.error("Feil ved henting av data fra serveren:", error);
          });
      }
      
      loadFromApi();

    return (
        
        <section id="projects">
            {projects?.map((project) => (
                <ProjectCard project={project}/>
            ))
            }
            
        </section>
    )
}