import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ContextVariables } from "./types";
import { env } from "../lib/env";
import { projectController } from "../features/project.controller";

const app = new Hono<{ Variables: ContextVariables }>();

app.use(
  "/*",
   cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))


app.use("/*", serveStatic({root: "./"} ));

app.route("/api/v1", projectController);

const port = env.PORT;

console.log(`"server is running on port ${env.PORT}`)

serve({
    fetch: app.fetch,
    port,
  });