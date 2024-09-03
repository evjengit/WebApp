import './style.css'
import portfolio from './data.json'

const data = portfolio

const projectsSection = document.querySelector('#projects') as HTMLElement;
const projectForm = document.querySelector('#project-form form') as HTMLFormElement;

const createProjectCard = (project: {
    id: number;
    name: string;
    description: string;
    image: string;
    repoUrl: string;
    dateCreated: string;
  }) => {
    return `
      <article>
        <h3>${project.name}</h3>
        <div class="project-wrapper">
          <img src="${project.image}" alt="${project.name}">
          <div class="project-content">
            <p>${project.description}</p>
            <a href="${project.repoUrl}" target="_blank">View Repository</a>
            <p>Opprettet: ${project.dateCreated}</p>
          </div> 
        </div>
      </article>
    `;
  };
  
  const loadProjects = () => {
    if (projectsSection) {
      const projectCards = data.portfolio.projects.map(createProjectCard).join('');
      projectsSection.innerHTML = projectCards;
    }
  };

  loadProjects();

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
  
    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const description = (document.querySelector('#description') as HTMLTextAreaElement).value;
    const repoUrl = (document.querySelector('#repoUrl') as HTMLInputElement).value;
    const image = (document.querySelector('#imageUrl') as HTMLInputElement).value;
  
    const newProject = {
      id: data.portfolio.projects.length + 1,
      name,
      description,
      image,
      repoUrl,
      dateCreated: new Date().toISOString().split('T')[0],
    };
  
    data.portfolio.projects.push(newProject);
  
    loadProjects();
  
    projectForm.reset();
  };

  projectForm.addEventListener('submit', handleFormSubmit);
