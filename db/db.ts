import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

/* If you deploy on Vercel/Neon and want the serverless (edge-friendly)
   driver instead of a long-lived pool, swap the two lines above for:

   import { drizzle } from "drizzle-orm/neon-http";
   import { neon } from "@neondatabase/serverless";
   const sql = neon(process.env.DATABASE_URL!);
   export const db = drizzle(sql, { schema });

   ...and `pnpm add @neondatabase/serverless` instead of `pg`. */
