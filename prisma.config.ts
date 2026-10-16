import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Generation and static builds do not require a database connection.
  datasource: { url: process.env.DATABASE_URL },
});
