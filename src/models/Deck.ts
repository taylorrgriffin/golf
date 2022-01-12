import { Card } from "./Card";
import { Suit } from "./Suit";
import { CardValue } from "./ CardValue";
import { DeckDesign } from "./DeckDesign";

import { IDeck } from "../intefaces/IDeck";

export class Deck implements IDeck {
  cards: Card[];

  constructor(design: DeckDesign) {
    let cards: Card[] = [];

    for (let suit in Suit) {
      if (isNaN(Number(suit))) {
        for (let value in CardValue) {
          if (value == CardValue.Joker) {
            continue; // add these later since they have no suit and we use a different number of them
          }
          cards.push(new Card(<Suit> suit, <CardValue> value, true, design));
        }
      }
    }

    // let's add three jokers for now... TODO: parameterize this later
    for (let i = 0; i < 3; i++) {
      cards.push(new Card(null, CardValue.Joker, true, design));
    }

    this.cards = cards;
  }
}