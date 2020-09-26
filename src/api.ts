import * as firebase from "firebase";
import _ from "lodash";
import { ICard } from "./types";

const getRef = _.memoize((ref?: string) => firebase.database().ref(ref));

const getCardsOfTopic = (topic: string) =>
  new Promise<ICard[]>((res, rej) => {
    const ref = getRef(topic);
    ref.once("value", (snapshot) => {
      if (!snapshot) {
        return rej(new Error("unknown reason"));
      }
      const value = snapshot.val() as ICard[] | null;
      if (!value) {
        return rej(new Error(`no values found for id "${topic}"`));
      }
      res(value);
    });
  });

const getAllCards = () =>
  new Promise<ICard[]>(async (res, rej) => {
    const ref = getRef();
    ref.once("value", (snapshot) => {
      if (!snapshot) {
        return rej(new Error("unknown reason"));
      }
      const value = snapshot.val() as {
        [topic: string]: ICard[] | null;
      } | null;
      if (!value) {
        return rej(new Error(`no values found in database`));
      }
      const cards = Object.keys(value).reduce<ICard[]>(
        (acc, topic) => [
          ...acc,
          ...(value[topic]?.map((card) => ({ ...card, topic })) ?? []),
        ],
        []
      );
      res(cards);
    });
  });

export const getCards = (topic?: string) =>
  topic ? getCardsOfTopic(topic) : getAllCards();
