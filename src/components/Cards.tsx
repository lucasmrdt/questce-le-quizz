import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "./Card";
import { ICard } from "../types";

const initCards = (cards: ICard[]) => [
  ...cards,
  ...cards.map(({ question, answer }) => ({
    question: answer,
    answer: question,
  })),
];

interface Props {
  cards: ICard[];
}

const Cards: React.FC<Props> = ({ cards: initialCards }) => {
  const classes = useStyles();
  const [cards, setCards] = useState(initCards(initialCards));

  const onSuccess = useCallback(() => {
    setCards((prev) => prev.slice(1));
  }, []);
  const onFailure = useCallback(() => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  if (cards.length === 0) {
    return (
      <h1 className={classes.text}>
        T'as terminé le "qu'est ce" !{" "}
        <span role={"img"} aria-label={"tada"}>
          🎉
        </span>
      </h1>
    );
  }
  const [selectedCard] = cards;
  return (
    <Card card={selectedCard} onSuccess={onSuccess} onFailure={onFailure} />
  );
};

const useStyles = makeStyles(() => ({
  text: {
    maxWidth: "90%",
    fontSize: 30,
    color: "rgb(70, 70, 70)",
    textAlign: "center",
  },
}));

export default React.memo(Cards);
