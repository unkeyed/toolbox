import { createRoute, z } from "@hono/zod-openapi";

import { openApiErrorResponses } from "./errors";

export const createKey = createRoute({
  method: "get",
  path: "/v1/create/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            key: z.string().openapi({
              description: "The key",
              example: "1234567890",
            }),
            keyId: z.string().openapi({
              description: "The keyId",
              example: "1234567890",
            }),
          }),
        },
      },
      description: "Successful response when a key is created",
    },
    ...openApiErrorResponses,
  },
});
