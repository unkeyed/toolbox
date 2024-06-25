#!/usr/bin/env node
import { buildPkgInstallerMap } from "~/installers/index.js";
import { parseNameAndPath } from "~/utils/parseNameAndPath.js";
import { runCli } from "./cli/index.js";
import { TITLE_TEXT } from "./consts.js";
import { createProject } from "./helpers/createProject.js";
import { installDependencies } from "./helpers/installDeps.js";
import { nextSteps } from "./helpers/nextSteps.js";

const main = async () => {
  console.log(TITLE_TEXT);

  const { appName, packages, databaseProvider } = await runCli();

  const usePackages = buildPkgInstallerMap(packages);
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    packages: usePackages,
    databaseProvider,
  });
  await installDependencies({ projectDir });
  await nextSteps({
    projectName: appDir,
    packages: usePackages,
    projectDir,
    databaseProvider,
  });

  process.exit(0);
};

main().catch((err) => {
  console.error("Aborting installation...");
  if (err instanceof Error) {
    console.error(err);
  } else {
    console.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
