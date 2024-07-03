import { drizzle } from 'drizzle-orm/d1';
import { D1Database } from '@cloudflare/d1';
import { schema } from './schema';

export async function connectDatabase(db: D1Database) {
  const drizzleInstance = drizzle(db, { schema });
  return drizzleInstance;
}
