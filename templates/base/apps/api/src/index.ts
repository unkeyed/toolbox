import { initCache } from "./lib/cache";
import { newApp } from "./lib/hono";
import { initRatelimiter } from "./lib/ratelimit";
import { keys } from "./routes/keys";
import { posts } from "./routes/posts";

const app = newApp();

app.use(initCache());
app.use(initRatelimiter());

app.route("/keys/", keys);
app.route("/posts/", posts);
export default app;
