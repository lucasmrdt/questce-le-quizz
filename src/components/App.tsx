import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
// @ts-ignore
import SnackbarProvider from "react-simple-snackbar";

import CardsProvider from "./CardsProvider";
import { makeStyles } from "@material-ui/core";

const App = () => {
  const classes = useStyles();

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
      <CardsProvider />
    </SnackbarProvider>
  );
};

const useStyles = makeStyles(() => ({
  github: {
    position: "absolute",
    top: 10,
    right: 10,
  },
}));

export default App;
