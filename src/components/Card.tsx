import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TeX from "@matejmazur/react-katex";

import { ICard, IValue, IValueType } from "../types";

const Value = ({ value }: { value: IValue }) => {
  const classes = useStyles();

  switch (value.type) {
    case IValueType.katex:
      return <TeX className={classes.text} math={value.value} />;
    case IValueType.picture:
      return <img src={value.value} className={classes.image} alt={"answer"} />;
    case IValueType.string:
    default:
      return <h2 className={classes.text}>{value.value}</h2>;
  }
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
        <h1 className={classes.title}>La réponse était ...</h1>
        <Value value={card.answer} />
        <div className={classes.buttonsContainer}>
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
      <h1 className={classes.title}>Qu'est ce ...</h1>
      <Value value={card.question} />
      <div>
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
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "rgb(90, 90, 90)",
  },
  text: {
    fontSize: 30,
    color: "rgb(50, 50, 50)",
    maxWidth: "90%",
    overflow: "scroll",
    textAlign: "center",
  },
  image: {
    maxWidth: "80%",
    maxHeight: "80%",
  },
  icon: {
    marginLeft: 10,
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
}));

export default React.memo(Card);
