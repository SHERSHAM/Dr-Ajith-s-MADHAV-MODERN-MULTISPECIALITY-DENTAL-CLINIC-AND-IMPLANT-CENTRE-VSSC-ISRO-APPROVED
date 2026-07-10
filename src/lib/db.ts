import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// Locate SQLite file correctly relative to the project root
const dbPath = path.join(process.cwd(), "prisma", "dev.db");

// Instantiate driver adapter directly in Prisma 7
const adapter = new PrismaBetterSqlite3({
  url: dbPath,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
