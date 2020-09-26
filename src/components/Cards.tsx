import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import Card from "./Card";
import { store } from "../store";
import { ICard } from "../types";

interface Props {
  cards: ICard[];
  onRefresh: () => void;
}

const Cards: React.FC<Props> = ({ cards: initialCards, onRefresh }) => {
  const classes = useStyles();
  const [cards, setCards] = useState(initialCards);

  const onSuccess = useCallback(() => {
    setCards((prev) => prev.slice(1));
  }, []);
  const onFailure = useCallback(() => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  useEffect(() => {
    const [selectedCard] = cards;
    if (selectedCard) {
      store.set("topic", selectedCard.topic ?? null);
    }
  }, [cards]);

  if (cards.length === 0) {
    return (
      <div className={classes.fullCentered}>
        <h1 className={classes.text}>
          Bravo tu as terminé !{" "}
          <span role={"img"} aria-label={"tada"}>
            🎉
          </span>
        </h1>
        <Button
          onClick={onRefresh}
          variant={"contained"}
          className={classes.button}
        >
          Recommencer
          <RefreshIcon className={classes.icon} />
        </Button>
      </div>
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
  fullCentered: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    marginTop: 30,
  },
  icon: {
    marginLeft: 15,
  },
}));

export default React.memo(Cards);
