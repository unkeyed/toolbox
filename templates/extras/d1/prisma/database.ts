import { PrismaClient } from '@prisma/client';

export async function connectDatabase(env: { DATABASE_URL: string }) {
  const { DATABASE_URL } = env;

  const prisma = new PrismaClient({
    datasources: { db: { url: DATABASE_URL } },
  });

  return prisma;
}
