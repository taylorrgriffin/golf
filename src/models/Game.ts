import { DeckCollection } from "./DeckCollection";

export interface Game {
  drawPile: DeckCollection,
  discardPile: DeckCollection,
}