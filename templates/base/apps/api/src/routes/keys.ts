import { OpenAPIHono } from "@hono/zod-openapi";
import { Unkey } from "@unkey/api";

import type { HonoEnv } from "../lib/hono";
import { createKey } from "../schema/keys";

export const keys = new OpenAPIHono<HonoEnv>().openapi(createKey, async (c) => {
  const ratelimited = await c.get("ratelimit").limit("fake-user");
  if (!ratelimited.success) {
    return c.json({ error: "Try again later" }, 429);
  }
  const unkey = new Unkey({ rootKey: c.env.UNKEY_ROOT_KEY });
  const apiId = c.env.UNKEY_API_ID!;
  const { result, error } = await unkey.keys.create({
    apiId: apiId,
    prefix: "tool",
  });
  if (error) {
    return c.json({ error: "Error occcured creating key" }, 400);
  }
  return c.json({ key: result.key, keyId: result.keyId }, 200);
});
