import { OpenAPIHono } from "@hono/zod-openapi";
import { Unkey } from "@unkey/api";
import { Ratelimit } from "@unkey/ratelimit";

import { createKey } from "../schema/keys";

type Bindings = {
  UNKEY_ROOT_KEY: string;
  UNKEY_API_ID: string;
};

const keys = new OpenAPIHono<{ Bindings: Bindings }>();

keys.openapi(createKey, async (c) => {
  const ratelimiter = new Ratelimit({
    rootKey: c.env.UNKEY_ROOT_KEY,
    namespace: "api-toolbox",
    limit: 10,
    duration: "30s",
    async: true,
  });
  const ratelimited = await ratelimiter.limit("fake-user");
  if (!ratelimited.success) {
    return c.json({ error: "Try again later" }, 429);
  }
  const unkey = new Unkey({ rootKey: c.env.UNKEY_ROOT_KEY });
  const apiId = c.env.UNKEY_API_ID!;
  const { result, error } = await unkey.keys.create({
    apiId: apiId,
    prefix: "tool",
  });
  if (error) return c.json({ error: "Error occcured creating key" }, 400);
  return c.json({ key: result.key, keyId: result.keyId }, 200);
});

export default keys;
