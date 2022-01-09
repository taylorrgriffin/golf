import { Suit } from "./Suit";
import { CardValue } from "./ CardValue";
import { DeckDesign } from "./DeckDesign";

export interface Card {
  suit: Suit;
  value: CardValue;
  design: DeckDesign
}