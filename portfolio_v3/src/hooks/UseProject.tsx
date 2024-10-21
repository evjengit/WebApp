import { useState, useEffect } from 'react';
import { Project } from '../features/project.schema';
import { ENDPOINTS } from '../config';

export function UseProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch(ENDPOINTS.projects, {credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.data);
        console.log(data)
      })
      .catch((error: Error) => {
        console.error("Error fetching data from the server:", error);
      });
  };

  const updateProjects = async (id: string, updatedData: any)  => {
    const response = await fetch(`/update/${id}`, {
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
    const response = await fetch(`/delete/${id}`, {
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

  return { projects, loadProjects, updateProjects };
}

export default UseProjects;
