import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");
export const TITLE_TEXT = "Unkey Toolbox";
export const DEFAULT_APP_NAME = "my-api";
export const API_TOOLBOX = "api-toolbox";
