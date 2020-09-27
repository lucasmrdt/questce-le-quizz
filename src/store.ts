import { createStore } from "nedux";
import { createStoreHook } from "react-nedux";

export const store = createStore({
  topic: null as string | null,
  progress: null as { total: number; current: number } | null,
});

export const useStore = createStoreHook(store);
