import { useState, useEffect } from 'react';
import { type Project } from "../data/types";
import { ENDPOINTS } from '../config';

export function UseProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch(ENDPOINTS.projects, {credentials: "include"})
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
  }, []);

  return { projects, loadProjects };
}

export default UseProjects;
