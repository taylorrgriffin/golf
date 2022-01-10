import { Suit } from "./Suit";
import {ICard} from "../intefaces/ICard";
import { CardValue } from "./ CardValue";
import { DeckDesign } from "./DeckDesign";

export class Card implements ICard {
  suit: Suit;
  value: CardValue;
  faceDown: Boolean;
  design: DeckDesign;
  
  constructor(suit : Suit, value : CardValue, faceDown : Boolean, design: DeckDesign) {
    this.suit = suit;
    this.value = value;
    this.faceDown = faceDown;
    this.design = design;
  }

  flipFaceUp() : void {
    this.faceDown = false;
  }
}