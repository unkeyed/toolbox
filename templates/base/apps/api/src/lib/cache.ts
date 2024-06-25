import { createCache, DefaultStatefulContext, Namespace } from "@unkey/cache";
import { MemoryStore } from "@unkey/cache/stores";

type Posts = { id: number; title: string; post: string };

const memory = new MemoryStore({ persistentMap: new Map() });
const ctx = new DefaultStatefulContext();

export const cache = createCache({
  post: new Namespace<Posts>(ctx, {
    stores: [memory],
    fresh: 300_000,
    stale: 900_000,
  }),
});
