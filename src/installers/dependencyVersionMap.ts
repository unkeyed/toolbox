/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // Prisma
  prisma: "^5.14.0",
  "@prisma/client": "^5.14.0",
  "@prisma/adapter-libsql": "^5.15.0",
  // Drizzle
  "drizzle-orm": "^0.30.10",
  "drizzle-kit": "^0.21.4",
  "eslint-plugin-drizzle": "^0.2.3",
  // These are dependencies that are shared between Prisma and Drizzle
  "dotenv-cli": "^7.4.2",
  "@libsql/client": "^0.6.2",
  // PostgreSQL dependencies
  pg: "^8.11.3",
  "@types/pg": "^8.10.9",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
