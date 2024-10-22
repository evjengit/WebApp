import { useState } from "react";
import { Project } from "../features/project.schema"; 
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  updateProject: (id: string, updatedData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export default function ProjectCard({ project, updateProject, deleteProject }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [updatedProject, setUpdatedProject] = useState<Partial<Project>>({
    name: project.name,
    description: project.description,
  });

  const handleDelete = () => {
    deleteProject(project.id);
  };

  const toggleEdit = () => {
    if (isEditing) {
      setUpdatedProject({
        name: project.name,
        description: project.description,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    const changedProject = {
      ...project,
      ...updatedProject
    }
    updateProject(project.id, changedProject);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdatedProject({
      ...updatedProject,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <article>
      <h3>{project.name}</h3>
      <div className="project-wrapper">
        <img src={project.image} alt={project.name} />
        <div className="project-content">
          {isEditing ? (
            <div>
              <label>
                Project Name:
                <input
                  type="text"
                  name="name"
                  value={updatedProject.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  id="edit-description"
                  name="description"
                  value={updatedProject.description}
                  onChange={handleChange}
                />
              </label>
              <div className="project-buttons">
                <button className="button5" type="button" onClick={handleUpdate}>
                  Save
                </button>
                <button className="button5" type="button" onClick={toggleEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>{project.description}</p>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                View Repository
              </a>
              <p>Opprettet: {format(new Date(project.dateCreated), "dd/MM/yyyy")}</p>
              <div className="project-buttons">
                <button className="button5" type="button" onClick={toggleEdit}>
                  Edit
                </button>
                <button className="button5" type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
