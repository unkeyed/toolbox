import { DEFAULT_APP_NAME } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

export const nextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  packages,
}: Pick<
  InstallerOptions,
  "projectName" | "packages" | "projectDir" | "databaseProvider"
>) => {
  const pkgManager = getUserPkgManager();

  console.info("Next steps:\n");
  projectName !== "." && console.info(`  cd ${projectName}/apps/api \n`);
  console.info(`  Update .dev.vars with \n`);
  console.info(`    TURSO_DATABASE_URL="YOUR_DATABASE_URL"`);
  console.info(`    TURSO_AUTH_TOKEN="YOUR_AUTH_TOKEN"`);
  console.info(`    UNKEY_ROOT_KEY="YOUR_UNKEY_ROOT_KEY"`);
  console.info(`    UNKEY_API_ID="YOUR_UNKEY_API_ID" \n`);
  if (pkgManager === "yarn") {
    console.info(`  ${pkgManager}`);
  }

  if (packages?.prisma.inUse) {
    console.info(
      `  npx turso db shell YOUR_DATABASE_NAME < ./prisma/migrations/20240626173453_init/migration.sql`
    );
  }

  if (packages?.drizzle.inUse) {
    if (["npm", "bun"].includes(pkgManager)) {
      console.info(`  ${pkgManager} run db:push`);
    } else {
      console.info(`  ${pkgManager} db:push`);
    }
  }

  if (["npm", "bun"].includes(pkgManager)) {
    console.info(`  ${pkgManager} run dev`);
  } else {
    console.info(`  ${pkgManager} dev`);
  }
  console.info(`  cd ..`);
  console.info(`  git init`);
  console.info(`  git commit -m "initial commit"`);
};
