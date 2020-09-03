export enum IValueType {
  string = "string",
  katex = "katex",
  picture = "picture",
}

export interface IValue {
  value: string;
  type: IValueType;
}

export interface ICard {
  question: IValue;
  answer: IValue;
}
