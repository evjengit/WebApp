import { useState } from "react";
import { CreateProject, Project } from "../features/project.schema";
import { ENDPOINTS } from "../config";
import { createId } from "../features/project.mapper";

interface FormProps {
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  loadProjects: () => void;
}

export default function Form({ loadProjects, setProjects }: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    repoUrl: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = "1";

    const newProject: CreateProject = {
      id: createId(),
      name: formData.name,
      repoUrl: formData.repoUrl,
      description: formData.description,
      image: formData.imageUrl,
      dateCreated: new Date().toISOString(),
      publishedAt: null,
      public: "0",
      status: "Draft",
      user_id: userId,
    };

    try {
      const response = await fetch(ENDPOINTS.add, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newProject),
      });

      console.log('Server response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log("Prosjektet ble lagt til:", data);
        setProjects((prevProjects) => [...prevProjects, newProject]);
        setFormData({
          name: "",
          repoUrl: "",
          description: "",
          imageUrl: "",
        });
        loadProjects()
      } else {
        console.error("Feil ved lagring av prosjekt:", response.statusText);
      }
    } catch (error) {
      console.error("Feil ved kommunikasjon med serveren:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <>
      <section id="project-form">
        <h2>Opprett nytt prosjekt</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Navn</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Projekt A"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="repoUrl">Repository</label>
          <input
            type="url"
            id="repoUrl"
            name="repoUrl"
            pattern="https://.*"
            placeholder="https://github.com/karlegil/project-a"
            value={formData.repoUrl}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Beskrivelse</label>
          <textarea
            name="description"
            id="description"
            placeholder="Mobilapp for bildedeling"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="imageUrl">Bilde URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <button id="submit-project" type="submit">Opprett prosjekt</button>
        </form>
      </section>
    </>
  );
}
