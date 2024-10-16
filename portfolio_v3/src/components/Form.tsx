import { useState } from "react";
import { CreateProject } from "./types";
import { ENDPOINTS } from "../config";

export default function Form({ loadProjects }: { loadProjects: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    repoUrl: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProject: CreateProject = {
      name: formData.name,
      repoUrl: formData.repoUrl,
      description: formData.description,
      image: formData.imageUrl,
      dateCreated: new Date()
    };

    try {
      const response = await fetch(ENDPOINTS.add, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Prosjektet ble lagt til:", data);
        setFormData({
          name: "",
          repoUrl: "",
          description: "",
          imageUrl: "",
        });
        loadProjects();
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
