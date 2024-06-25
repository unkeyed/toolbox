import { type Installer } from "~/installers/index.js";
import path from "path";

import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
export const fumaInstaller: Installer = ({ projectDir }) => {
  const srcDir = path.join(PKG_ROOT, "templates/fumadocs");
  const destDir = path.join(projectDir, "/apps/docs");
  fs.copySync(srcDir, destDir);
};
