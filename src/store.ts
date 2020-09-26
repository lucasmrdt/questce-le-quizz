import { createStore } from "nedux";
import { createStoreHook } from "react-nedux";

export const store = createStore({
  topic: null as string | null,
});

export const useStore = createStoreHook(store);
