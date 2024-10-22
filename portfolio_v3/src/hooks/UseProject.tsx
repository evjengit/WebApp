import { useState, useEffect } from 'react';
import { Project } from '../features/project.schema';
import { ENDPOINTS } from '../config';

export function UseProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch(ENDPOINTS.projects, {credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log("loaded projects", data)
        setProjects(data.data);
      })
      .catch((error: Error) => {
        console.error("Error fetching data from the server:", error);
      });
  };

  const updateProject = async (id: string, updatedData: Partial<Project>)  => {
    const response = await fetch(`${ENDPOINTS.update}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  
    if (response.ok) {
      console.log('Project updated successfully');
      loadProjects()
    } else {
      console.error('Failed to update project');
    }
  }

  const deleteProject = async (id: string) => {
    const response = await fetch(`${ENDPOINTS.delete}/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      console.log('Project deleted successfully');
      loadProjects()
    } else {
      console.error('Failed to delete project');
    }  
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return { projects, loadProjects, updateProject, deleteProject, setProjects };
}

export default UseProjects;
