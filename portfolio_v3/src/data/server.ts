import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ContextVariables, type Project } from "./types";
import { authenticate } from "./auth";

const app = new Hono<{ Variables: ContextVariables }>();

app.use(
  "/*",
   cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))


app.use("/*", serveStatic({root: "./"} ));



const projects: Project[] = [
        { "id": crypto.randomUUID(),
          "name": "Project A",
          "description": "En web appikasjon for bildedeling.",
          "image": "https://as1.ftcdn.net/v2/jpg/03/13/76/04/1000_F_313760421_txS6xrTba0qWshvmassQbCXbSlBpW5lG.jpg",
          "repoUrl": "https://github.com/karlegil/project-a",
          "dateCreated": new Date(2024, 8, 15),
          "publishedAt": null,
          "public": true,
          "status": "Draft",
          "tags": [],
          "user_id": "1"
        },
        {
          "id": crypto.randomUUID(),
          "name": "Project B",
          "description": "En timeplanorganisator for alle daglige hendelser.",
          "image": "https://as1.ftcdn.net/v2/jpg/04/46/95/98/1000_F_446959837_ud38y0tq3BLXku5g72xfD4JT087Cz5R7.jpg",
          "repoUrl": "https://github.com/karlegil/project-b",
          "dateCreated": new Date(2024, 8, 10),
          "publishedAt": null,
          "public": false,
          "status": "Draft",
          "tags": [],
          "user_id": "2"
        },
        {
            "id": crypto.randomUUID(),
            "name": "Project C",
            "description": "En dungeons and dragons spillapplikasjon",
            "image": "https://t3.ftcdn.net/jpg/05/04/79/10/240_F_504791075_wUcRE11vbiBLwGPdAKX9Y4cVNCPi22Ps.jpg",
            "repoUrl": "https://github.com/karlegil/project-c",
            "dateCreated": new Date(2024, 8, 12),
            "publishedAt": null,
            "public": false,
            "status": "Draft",
            "tags": [],
            "user_id": "3"
          }
]

app.get("/projects", authenticate(), async (c) => {
  const user = c.get("user");
  console.log(user)
  const filteredProjects = projects.filter(project => project.public || user?.admin === "true");
  
  return c.json<Project[]>(filteredProjects);
});

// mangler validering: id ikke gyldig, student finnes ikke
//  fetch(´${API_BASE_URL.projects}/${id}´, {method: 'GET'})
app.get('/projects/:id', (c) => {
  const id = c.req.param("id")
  const project = projects.filter((project) => project.id === id)
  return c.json(project);
})

app.post("/add", async (c) => {
    const Project = await c.req.json();
    console.log(Project)
    projects.push(Project)
    return c.json<Project[]>(projects, { status: 201 });
})

//   fetch({API_BASE_URL.projects}, {method: 'DELETE'}) @@@ mangler headere
app.get('/projects/:id', (c) => {
  const id = c.req.param("id")
  const filteredprojects = projects.filter(
    (project) => project.id !== id
  )
  return c.json(filteredprojects);
})

// fetch(´${API_BASE_URL.projects}/${id}´, {method: 'PATCH', body: JSON.stringify(data)})
app.patch('/projects/:id', async (c) => {
  const id = c.req.param("id")
  const { name } = await c.req.json()
  const updatedProjects = projects.map((project) =>
    project.id === id ? { ...project, name } : project
  );
  return c.json(updatedProjects);
})

const port = 3999;

console.log(`"server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
  });