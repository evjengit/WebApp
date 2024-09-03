import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "./types";
import fs from "node:fs/promises";


const app = new Hono();

app.use("/*", cors())
app.use("/*", serveStatic({root: "./"} ));

const projects: Project[] = [
/*     {
        id: data.portfolio.projects.length + 1,
        name,
        description,
        image,
        repoUrl,
        dateCreated: new Date().toISOString().split('T')[0],
    } */
]

app.post("/add", async (c) => {
    const newProject = await c.req.json();
/*     const project = ProjectSchema.parse(newProject); */
    projects.push({
        id: crypto.randomUUID,
        ...newProject,
        dateCreated: new Date(),
    });
  
    return c.json(projects, { status: 201 });
})

app.get("/", async (c) => {
/*     const data = await fs.readFile("./static/data.json", "utf8");
    const dataAsJson = JSON.parse(data); */
    return c.json(projects);
})

const port = 3999;

console.log(`"server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
  });