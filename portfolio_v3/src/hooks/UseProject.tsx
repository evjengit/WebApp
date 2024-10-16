import { useState, useEffect } from 'react';
import { type Project } from "../components/types";
import { ENDPOINTS } from '../config';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch(ENDPOINTS.projects)
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjects(data);
      })
      .catch((error: Error) => {
        console.error("Error fetching data from the server:", error);
      });
  };

  useEffect(() => {
    loadProjects();
  }, [projects]);

  return { projects, loadProjects };
}

export default useProjects;
