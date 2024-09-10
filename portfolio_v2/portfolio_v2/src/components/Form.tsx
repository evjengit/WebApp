export default function Form() {

    return (
        <>
            <section id="project-form">
            <h2>Opprett nytt prosjekt</h2>
            <form action="./sampleData.json" method="post">
                <label htmlFor="name">Navn</label>
                <input id="name" name="name" type="text" placeholder="Projekt A" required/>
                <label htmlFor="repoUrl">Repository</label>
                <input type="url" id="repoUrl" name="repoUrl" pattern="https://.*" placeholder="https://github.com/karlegil/project-a" required/>
                <label htmlFor="description">Beskrivelse</label>
                <textarea name="description" id="description" placeholder="Mobilapp for bildedeling" required></textarea>
                <label htmlFor="imageUrl">Bilde URL</label>
                <input type="url" id="imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg" required/>
                <button id="submit-project" type="submit">Opprett prosjekt</button>
            </form>
            </section>
        </>
    );
  }