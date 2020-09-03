import { useMemo } from "react";

export const useCardsId = () => {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const cardsId = useMemo(() => query.get("id"), [query]);

  return cardsId;
};
