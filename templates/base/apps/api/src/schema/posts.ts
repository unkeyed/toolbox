import { createRoute, z } from "@hono/zod-openapi";

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  post: z.string(),
});

const postListSchema = z.object({
  posts: z.array(postSchema),
});

const errorSchema = z.object({
  error: z.string(),
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
    400: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "Error occured while fetching posts.",
      description: "Error for when something goes wrong while fetching posts.",
    },
    401: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "not authorized",
      description: "User is not authorized to access this resource.",
    },
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
    400: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "Error occured while creating post.",
      description: "Error occured during the creation of the post.",
    },
    401: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "not authorized",
      description: "User is not authorized to access this resource.",
    },
  },
});

const getPostRequestSchema = z.object({
  id: z.string(),
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
    400: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "Error occured while fetching single post.",
      description:
        "error returned when fetching single post and something went wrong",
    },
    401: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "not authorized",
      description: "User is not authorized to access this resource.",
    },
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
      id: z.string(),
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
    400: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "Error occured while updating this post.",
      description: "Error for when something went wrong while updating post.",
    },
    401: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "not authorized",
      description: "User is not authorized to access this resource.",
    },
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
    400: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "Error occured while deleting post.",
      description: "Error for when something went wrong while deleting post.",
    },
    401: {
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
      example: "not authorized",
      description: "User is not authorized to access this resource.",
    },
  },
});
