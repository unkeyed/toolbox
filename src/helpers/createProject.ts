import path from "path";
import { installPackages } from "./installPackages.js";
import { scaffoldProject } from "./scaffoldProject.js";
import {
  type DatabaseProvider,
  type PkgInstallerMap,
} from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  scopedAppName: string;
  databaseProvider: DatabaseProvider;
}

export const createProject = async ({
  projectName,
  scopedAppName,
  packages,
  databaseProvider,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base API application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    scopedAppName,
    databaseProvider,
  });

  // Install the selected packages
  installPackages({
    projectName,
    scopedAppName,
    projectDir,
    pkgManager,
    packages,
    databaseProvider,
  });

  return projectDir;
};
