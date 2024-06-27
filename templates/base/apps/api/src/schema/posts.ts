import { createRoute, z } from "@hono/zod-openapi";

import { openApiErrorResponses } from "./errors";

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  post: z.string(),
});

const postListSchema = z.object({
  posts: z.array(postSchema),
});

const HeadersSchema = z.object({
  // Header keys must be in lowercase, `Authorization` is not allowed.
  authorization: z.string().openapi({
    example: "Bearer UNKEY_API_KEY",
  }),
});

export const getPosts = createRoute({
  method: "get",
  path: "/all/",
  request: {
    headers: HeadersSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: postListSchema,
        },
      },
      description: "Retrieve list of posts",
    },
    ...openApiErrorResponses,
  },
});

const createPostRequestSchema = z.object({
  title: z.string(),
  post: z.string(),
});

export const createPost = createRoute({
  method: "post",
  path: "/create/",
  request: {
    headers: HeadersSchema,
    body: {
      content: {
        "application/json": {
          schema: createPostRequestSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
      description: "Create a post",
    },
    ...openApiErrorResponses,
  },
});

const getPostRequestSchema = z.object({
  id: z.coerce.number().int(),
});

export const getPost = createRoute({
  method: "get",
  path: "get/:id",

  request: {
    headers: HeadersSchema,
    params: getPostRequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: postSchema,
        },
      },
      description: "Authorized Response",
    },
    ...openApiErrorResponses,
  },
});

const updatePostRequestSchema = z.object({
  title: z.string(),
  post: z.string(),
});

export const updatePost = createRoute({
  method: "patch",
  path: "update/:id",
  request: {
    headers: HeadersSchema,
    params: z.object({
      id: z.coerce.number().int(),
    }),
    body: {
      content: {
        "application/json": {
          schema: updatePostRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: postSchema,
        },
      },
      description: "Update post",
    },
    ...openApiErrorResponses,
  },
});

const deletePostRequestSchema = z.object({
  id: z.number(),
});

export const deletePost = createRoute({
  method: "delete",
  path: "delete/:id",
  request: {
    headers: HeadersSchema,
    params: deletePostRequestSchema,
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
      description: "Delete Post",
    },
    ...openApiErrorResponses,
  },
});
