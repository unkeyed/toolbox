import { initCache } from "./lib/cache";
import { newApp } from "./lib/hono";
import { initRatelimiter } from "./lib/ratelimit";
import { keys } from "./routes/keys";
import { posts } from "./routes/posts";

const app = newApp();
const version = "v1";
app.use(initCache());
app.use(initRatelimiter());

app.route(`${version}/keys/`, keys);
app.route(`${version}/posts/`, posts);
export default app;
