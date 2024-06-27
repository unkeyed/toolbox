import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { schema } from "./schema";

export function connectDatabse(c: {
  env: { TURSO_DATABASE_URL: string; TURSO_AUTH_TOKEN: string };
}) {
  const turso = createClient({
    url: c.env.TURSO_DATABASE_URL,
    authToken: c.env.TURSO_AUTH_TOKEN,
  });

  return drizzle(turso, { schema });
}
