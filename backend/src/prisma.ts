import { PrismaClient } from "./generated/prisma/client.js";

declare global {
  // 在 globalThis 上掛 prisma，避免開發環境中熱重載造成多次連線
  var prisma: PrismaClient | undefined;
}

const isProduction = process.env.NODE_ENV === "production";

const prismaClient = global.prisma ?? new PrismaClient();

if (!isProduction) global.prisma = prismaClient;

export const prisma = prismaClient;
