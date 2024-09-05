import './style.css'
import { z } from "zod"
import { ProjectArraySchema, type Project } from './types';

//const data = portfolio

const projectsSection = document.querySelector('#projects') as HTMLElement;
const projectForm = document.querySelector('#project-form form') as HTMLFormElement;
const projects: Project[] = [];

  projectForm.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();
  
    const name = (document.querySelector('#name') as HTMLInputElement)?.value;
    const description = (document.querySelector('#description') as HTMLTextAreaElement)?.value;
    const repoUrl = (document.querySelector('#repoUrl') as HTMLInputElement)?.value;
    const image = (document.querySelector('#imageUrl') as HTMLInputElement)?.value;

    const newProject = {
      id: crypto.randomUUID(),
      name,
      description,
      repoUrl,
      image,
      dateCreated: new Date(),
    };
  
    projects.push(newProject);
    updateProjectsList();
  
    try {
      const response = await fetch("http://localhost:3999/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
  
      if (response.status === 201) {
        console.log("Prosjekt lagret på serveren");
      } else {
        console.error("Feil ved lagring av prosjekt på serveren");
      }
    } catch (error) {
      console.error("Feil ved sending av data til serveren:", error);
    }
  });
  
  function updateProjectsList() {
    console.log(projects);
    if (!projectsSection) return;
    projectsSection.innerHTML = "";
    
    const projectsUpdated = () => {
        for (const project of projects) {
        projectsSection.innerHTML +=
        `
        <article>
            <h3>${project.name}</h3>
            <div class="project-wrapper">
            <img src="${project.image}" alt="${project.name}">
            <div class="project-content">
                <p>${project.description}</p>
                <a href="${project.repoUrl}" target="_blank">View Repository</a>
                <p>Opprettet: ${project.dateCreated.toLocaleDateString()}</p>
            </div> 
            </div>
        </article>
        ` 
        }
    }
    projectsUpdated()
  }
  
  function loadFromApi() {
    fetch("http://localhost:3999")
      .then((response) => response.json())
      .then((data: unknown) => {
        try {
          const validatedProjects = ProjectArraySchema.parse(data);
  
          projects.push(...validatedProjects);
          updateProjectsList();
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("Ugyldig data mottatt fra serveren:", error.errors);
          } else {
            console.error("Uventet feil ved validering av data:", error);
          }
        }
      })
      .catch((error: Error) => {
        console.error("Feil ved henting av data fra serveren:", error);
      });
  }
  
  loadFromApi();
