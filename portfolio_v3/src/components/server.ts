import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { type Project } from "./types";


const app = new Hono();

app.use("/*", cors())
app.use("/*", serveStatic({root: "./"} ));

const projects: Project[] = [
        { "id": crypto.randomUUID(),
          "name": "Project A",
          "description": "En web appikasjon for bildedeling.",
          "image": "https://as1.ftcdn.net/v2/jpg/03/13/76/04/1000_F_313760421_txS6xrTba0qWshvmassQbCXbSlBpW5lG.jpg",
          "repoUrl": "https://github.com/karlegil/project-a",
          "dateCreated": new Date(2024, 8, 15)
        },
        {
          "id": crypto.randomUUID(),
          "name": "Project B",
          "description": "En timeplanorganisator for alle daglige hendelser.",
          "image": "https://as1.ftcdn.net/v2/jpg/04/46/95/98/1000_F_446959837_ud38y0tq3BLXku5g72xfD4JT087Cz5R7.jpg",
          "repoUrl": "https://github.com/karlegil/project-b",
          "dateCreated": new Date(2024, 8, 10)
        },
        {
            "id": crypto.randomUUID(),
            "name": "Project C",
            "description": "En dungeons and dragons spillapplikasjon",
            "image": "https://t3.ftcdn.net/jpg/05/04/79/10/240_F_504791075_wUcRE11vbiBLwGPdAKX9Y4cVNCPi22Ps.jpg",
            "repoUrl": "https://github.com/karlegil/project-c",
            "dateCreated": new Date(2024, 8, 12)
          }
]

app.get("/projects", async (c) => {
    return c.json<Project[]>(projects);
})

app.post("/add", async (c) => {
    const Project = await c.req.json();
    console.log(Project)
    projects.push(Project)
    return c.json<Project[]>(projects, { status: 201 });
})

const port = 3999;

console.log(`"server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
  });