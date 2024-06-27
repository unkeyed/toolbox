import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

export function connectDatabse(c: {
  env: { TURSO_DATABASE_URL: string; TURSO_AUTH_TOKEN: string };
}) {
  const libsql = createClient({
    url: c.env.TURSO_DATABASE_URL,
    authToken: c.env.TURSO_AUTH_TOKEN,
  });

  const adapter = new PrismaLibSQL(libsql);
  const prisma = new PrismaClient({ adapter });
  return prisma;
}
