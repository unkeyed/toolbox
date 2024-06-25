import { OpenAPIHono } from "@hono/zod-openapi";
import posts from "./routes/posts";
import keys from "./routes/keys";
import { type UnkeyContext, unkey } from "@unkey/hono";

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
