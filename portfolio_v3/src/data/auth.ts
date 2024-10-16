import { User } from "./types";
import { users } from "./users";
import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

const parseCookie = (cookie: string) => {
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};

export function getUser(request: Request): User | null {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  const id = cookies["user.id"];

  return users.find((user) => user.id === id) ?? null;
}

export const authenticate = (): MiddlewareHandler => {
    return async function authenticate(c, next) {
      const user = getUser(c.req.raw);
      if (!user) throw new HTTPException(401);
      c.set("user", user);
      await next();
    };
  };