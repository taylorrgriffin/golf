import { ICard } from "../intefaces/ICard";
import { Suit } from "./Suit";
import { CardValue } from "./ CardValue";
import { DeckDesign } from "./DeckDesign";

import { IDeck } from "../intefaces/IDeck";

export class Deck implements IDeck {
  cards: ICard[];

  constructor(design: DeckDesign) {
    let cards: ICard[] = [];

    for (let suit in Suit) {
      if (isNaN(Number(suit))) {
        for (let value in CardValue) {
          if (value == CardValue.Joker) {
            continue; // add these later since they have no suit and we use a different number of them
          }
          cards.push({ suit: <Suit> suit, value: <CardValue> value, faceDown: true, design });
        }
      }
    }

    // let's add three jokers for now... TODO: parameterize this later
    for (let i = 0; i < 3; i++) {
      cards.push({ suit: null, value: CardValue.Joker, faceDown: true, design });
    }

    this.cards = cards;
  }
}