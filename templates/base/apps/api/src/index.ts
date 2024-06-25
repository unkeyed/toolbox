import { OpenAPIHono } from "@hono/zod-openapi";
import { unkey, type UnkeyContext } from "@unkey/hono";

import keys from "./routes/keys";
import posts from "./routes/posts";

const app = new OpenAPIHono<{ Variables: { unkey: UnkeyContext } }>();

app.route("/keys/", keys);
app.route("/posts/", posts);
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "API",
  },
});
export default app;
