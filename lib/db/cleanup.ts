import { db, client } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

async function cleanup() {
  try {
    console.log('Dropping all tables...');
    await db.execute(sql`
      DROP TABLE IF EXISTS "pull_requests" CASCADE;
      DROP TABLE IF EXISTS "repos" CASCADE;
      DROP TABLE IF EXISTS "users" CASCADE;
    `);
    console.log('All tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    await client.end();
  }
}

cleanup(); 