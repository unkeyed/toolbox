import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { type AvailableDependencies } from "./dependencyVersionMap.js";

export const drizzleInstaller: Installer = ({
  projectDir,
  databaseProvider,
}) => {
  const devPackages: AvailableDependencies[] = [
    "drizzle-kit",
    "eslint-plugin-drizzle",
  ];

  addPackageDependency({
    projectDir,
    dependencies: devPackages,
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    devMode: true,
    dependencies: ["dotenv-cli"],
  });
  addPackageDependency({
    projectDir,
    dependencies: [
      "drizzle-orm",
      (
        ({
          turso: "@libsql/client",
          sqlite: "@libsql/client",
        } as const
      )[databaseProvider],
    ],
    devMode: false,
  });

  const pkgManager = getUserPkgManager();
  let turboManager = "";

  if (pkgManager == "npm") {
    turboManager = "npm@10.7.0";
  } else if (pkgManager == "yarn") {
    turboManager = "yarn@3.0.2";
  } else if (pkgManager == "pnpm") {
    turboManager = "pnpm@6.14.0";
  }
  const data = fs.readFileSync(path.join(projectDir, "package.json"));
  const modifiedData = data.toString().slice(0, -2);

  fs.writeFileSync(path.join(projectDir, "package.json"), modifiedData);
  fs.appendFileSync(
    path.join(projectDir, "package.json"),
    `,\n "packageManager":  "${turboManager}" \n }`
  );


  const configName = databaseProvider === "d1"
    ? "drizzle-d1-config.ts"
    : databaseProvider === "turso"
    databaseProvider === "turso"
      ? "drizzle-turso-config.ts"
      : "drizzle-config.ts";
  const configFile = path.join(extrasDir, `/drizzle/config/${configName}`);
  const databaseSrc = databaseProvider === "d1"
    ? path.join(extrasDir, "d1/drizzle/database.ts")
    : path.join(extrasDir, "drizzle/database.ts");
  const configDest = path.join(projectDir, "apps/api/drizzle.config.ts");
  const schemaName = databaseProvider === "turso" ? "turso.ts" : `base.ts`;
  const schemaSrc = path.join(extrasDir, "drizzle/db/", schemaName);
  const schemaDest = path.join(projectDir, `apps/api/src/db/${schemaName}`);
  const indexSrc = path.join(extrasDir, "drizzle/db/index.ts");
  const indexDest = path.join(projectDir, `apps/api/src/db/index.ts`);
  const databaseSrc = path.join(extrasDir, "drizzle/database.ts");
  const databaseDest = path.join(projectDir, "apps/api/src/database.ts");
  const clientSrc = path.join(extrasDir, "drizzle/hono/posts.ts");
  const destination = path.join(projectDir, "apps/api/src/routes/posts.ts");

  // add db:* scripts to package.json
  const packageJsonPath = path.join(projectDir, "apps/api/package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    env: "dotenv -e .dev.vars",
    "db:push": "npm run env -- drizzle-kit push",
    "db:studio": "npm run env -- drizzle-kit studio",
    "db:generate": "npm run env -- drizzle-kit generate",
    "db:migrate": "npm run env -- drizzle-kit migrate",
  };

  fs.copySync(configFile, configDest);
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.copySync(schemaSrc, schemaDest);
  fs.copyFileSync(clientSrc, destination);
  fs.copyFileSync(indexSrc, indexDest);
  fs.copyFileSync(databaseSrc, databaseDest);

  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });

  const envPath = path.join(projectDir, "apps/api/.dev.vars");
  if (databaseProvider === "turso") {
    fs.appendFileSync(envPath, `TURSO_DATABASE_URL="YOUR_DATABASE_URL_HERE"\n`);
    fs.appendFileSync(envPath, `TURSO_AUTH_TOKEN="YOUR_AUTH_TOKEN"\n`);
  } else if (databaseProvider === "d1") {
    fs.appendFileSync(envPath, `D1_DATABASE_URL="YOUR_D1_DATABASE_URL"\n`);
    fs.appendFileSync(envPath, `D1_AUTH_TOKEN="YOUR_D1_AUTH_TOKEN"\n`);
  } else {
    fs.appendFileSync(envPath, `DATABASE_URL="file:./dev.db"`);
  }
};
