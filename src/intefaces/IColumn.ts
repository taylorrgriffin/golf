import { ICard } from "./ICard";

export interface IColumn {
  cards: [ICard, ICard, ICard],
  isCleared: Boolean
}