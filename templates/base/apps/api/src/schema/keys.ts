import { createRoute, z } from "@hono/zod-openapi";

export const createKey = createRoute({
  method: "get",
  path: "/create/",
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
    429: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              description: "Rate limit exceeded",
              example: "Rate limit exceeded",
            }),
          }),
        },
      },
      description: "User has been rate limited",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              description: "Error occured processing the request",
              example: "Error creating key",
            }),
          }),
        },
      },
      description: "Error occured processing the request",
    },
  },
});
