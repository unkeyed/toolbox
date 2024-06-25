import * as path from "node:path";
import * as OpenAPI from "fumadocs-openapi";
import * as Typescript from "fumadocs-typescript";

void OpenAPI.generateFiles({
  input: ["./*.json"],
  output: "../content/docs/",
  frontmatter: (title) => ({
    toc: false,
    title: `${title[0].toUpperCase()}${title.slice(1)}`,
  }),
});

void Typescript.generateFiles({
  input: ["../content/docs/**/*.model.mdx"],
  output: (file) =>
    path.resolve(
      path.dirname(file),
      `${path.basename(file).split(".")[0]}.mdx`
    ),
});
