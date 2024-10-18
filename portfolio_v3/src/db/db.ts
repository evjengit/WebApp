import Database from "better-sqlite3";
import { env } from "../lib/env";

const db = new Database(env.DATABASE_URL)
export type DB = typeof db;

export default db;