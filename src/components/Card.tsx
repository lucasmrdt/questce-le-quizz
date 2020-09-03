import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TeX from "@matejmazur/react-katex";
import reactStringReplace from "react-string-replace";

import { ICard } from "../types";

const Value = ({ value }: { value: string }): JSX.Element => {
  const classes = useStyles();
  const contentWithNewLines = reactStringReplace(value, /(\n)/i, () => (
    <div className={classes.separator} />
  ));
  const contentWithPictures = reactStringReplace(
    contentWithNewLines,
    /(https:\/\/[^\s/$.?#].[^\s]*)/i,
    (match) => (
      <img key={match} src={match} className={classes.image} alt={"answer"} />
    )
  );
  const contentWithKatex = reactStringReplace(
    contentWithPictures,
    /\$(.+?)\$/,
    (match) => <TeX className={classes.inline} key={match} math={match} />
  );

  return <p className={classes.text}>{contentWithKatex}</p>;
};

interface Props {
  card: ICard;
  onSuccess: () => void;
  onFailure: () => void;
}

const Card: React.FC<Props> = ({ card, onSuccess, onFailure }) => {
  const classes = useStyles();
  const [showAnswer, setShowAnswer] = useState(false);

  const onShowAnswer = useCallback(() => {
    setShowAnswer(true);
  }, []);
  const onSuccessWrapper = useCallback(() => {
    setShowAnswer(false);
    onSuccess();
  }, [onSuccess]);
  const onFailureWrapper = useCallback(() => {
    setShowAnswer(false);
    onFailure();
  }, [onFailure]);

  if (showAnswer) {
    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Cela correspond à ...</h1>
        <Value value={card.answer} />
        <div className={`${classes.buttonsContainer} ${classes.buttons}`}>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={onFailureWrapper}
          >
            J'ai faux{" "}
            <span className={classes.icon} role={"img"} aria-label={"sad"}>
              😢
            </span>
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={onSuccessWrapper}
          >
            J'ai juste{" "}
            <span className={classes.icon} role={"img"} aria-label={"love"}>
              😍
            </span>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>À quoi correspond ...</h1>
      <Value value={card.question} />
      <div className={classes.buttons}>
        <Button variant={"contained"} onClick={onShowAnswer}>
          Afficher la réponse
          <span className={classes.icon} role={"img"} aria-label={"sad"}>
            🤓
          </span>
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "90px 0",
  },
  separator: {
    width: "100%",
  },
  title: {
    fontSize: 25,
    color: "rgb(90, 90, 90)",
    marginBottom: 40,
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 30,
    color: "rgb(50, 50, 50)",
    maxWidth: "90%",
    overflow: "scroll",
    textAlign: "center",
  },
  image: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "0 20%",
  },
  icon: {
    marginLeft: 10,
  },
  buttons: {
    position: "fixed",
    bottom: 30,
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  inline: {
    margin: "0 8px",
  },
}));

export default React.memo(Card);
