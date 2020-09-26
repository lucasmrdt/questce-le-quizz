import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
// @ts-ignore
import SnackbarProvider from "react-simple-snackbar";
import { makeStyles } from "@material-ui/core";

import CardsProvider from "./CardsProvider";
import { useCardsId } from "../hooks";
import { useStore } from "../store";

const App = () => {
  const classes = useStyles();
  const cardsId = useCardsId();
  const [topic] = useStore("topic");

  return (
    <SnackbarProvider>
      <a
        rel={"noopener noreferrer"}
        href={"https://github.com/lucasmrdt/questce-le-quizz"}
        className={classes.github}
        target={"_blank"}
      >
        <GitHubIcon />
      </a>
      <h1 className={classes.title}>
        #{(topic ?? cardsId ?? "générale").toUpperCase()}
      </h1>
      <CardsProvider />
    </SnackbarProvider>
  );
};

const useStyles = makeStyles(() => ({
  github: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "rgb(0, 0, 0, .4)",
  },
  title: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "rgb(0, 0, 0, .4)",
    fontSize: 24,
  },
}));

export default App;
