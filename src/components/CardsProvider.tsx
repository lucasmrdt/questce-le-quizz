import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Error as ErrorIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// @ts-ignore
import { useSnackbar } from "react-simple-snackbar";

import Cards from "./Cards";
import { useCardsId } from "../hooks";
import { getAllCards } from "../api";
import { ICard } from "../types";

const ErrorComponent = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.fullCentered} ${classes.errorContainer}`}>
      <ErrorIcon />
      <h1 className={classes.message}>
        Aie, parameter "id" provided is incorrect ...
      </h1>
    </div>
  );
};

const LoadingComponent = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.fullCentered} ${classes.loadingContainer}`}>
      <CircularProgress />
      <h1 className={classes.message}>Loading cards ...</h1>
    </div>
  );
};

const CardsProvider: React.FC = () => {
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar] = useSnackbar();
  const cardsId = useCardsId();

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!cardsId) {
        throw new Error('parameter "id" must be provided');
      }
      const fetchedCards = await getAllCards(cardsId);
      setCards([
        ..._.shuffle(fetchedCards),
        ..._.shuffle(
          fetchedCards.map(({ answer, question }) => ({
            question: answer,
            answer: question,
          }))
        ),
      ]);
    } catch (e) {
      openSnackbar(e.message);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsId]);
  const onRefresh = useCallback(() => fetchCards(), [fetchCards]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (!cards) {
    return <ErrorComponent />;
  }
  return <Cards cards={cards} onRefresh={onRefresh} />;
};

const useStyles = makeStyles(() => ({
  fullCentered: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flexDirection: "column",
    padding: "0 30px auto",
    color: "rgb(240, 89, 89)",
  },
  loadingContainer: {
    flexDirection: "column",
    padding: "0 30px auto",
    color: "rgb(136, 136, 227)",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
}));

export default React.memo(CardsProvider);
