import * as firebase from "firebase";
import _ from "lodash";
import { ICard } from "./types";

const getRef = _.memoize((ref: string) => firebase.database().ref(ref));

export const getAllCards = (slug: string) =>
  new Promise<ICard[]>((res, rej) => {
    const ref = getRef(slug);
    ref.once("value", (snapshot) => {
      if (!snapshot) {
        return rej(new Error("unknown reason"));
      }
      const value = snapshot.val() as { [key: string]: ICard } | null;
      if (!value) {
        return rej(new Error(`no values found for id "${slug}"`));
      }
      const cards = Object.values(value);
      res(cards);
    });
  });
