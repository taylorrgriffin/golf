import { Suit } from "../models/Suit";
import { CardValue } from "../models/ CardValue";
import { DeckDesign } from "../models/DeckDesign";

export interface ICard {
  suit: Suit | null;
  value: CardValue;
  faceDown: Boolean;
  design: DeckDesign;
}