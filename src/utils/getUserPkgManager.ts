/*
This was copied from the `create-t3-app` package, under the MIT license.
The original source code can be found at https://github.com/t3-oss/create-t3-app/blob/main/cli/src/utils/getUserPkgManager.ts
*/

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const getUserPkgManager: () => PackageManager = () => {
  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else if (userAgent.startsWith("bun")) {
      return "bun";
    } else {
      return "npm";
    }
  } else {
    // If no user agent is set, assume npm
    return "npm";
  }
};
