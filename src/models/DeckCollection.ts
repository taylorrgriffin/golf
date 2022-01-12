import { Card } from "./Card";
import { shuffleCards } from '../utilities/shuffle';
import { IDeckCollection } from "../intefaces/IDeckCollection";

export class DeckCollection implements IDeckCollection {
  cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards
  }

  draw(): Card {
    let topCard = this.cards.pop();
    if (topCard == undefined) {
      throw Error("Error! We need more cards.");
    }
    return topCard;
  }

  peek(): Card {
    if (this.cards.length < 1) {
      throw Error("Error! We need more cards.");
    }
    return this.cards[this.cards.length - 1];
  }

  discard(card: Card): void {
    this.cards.push(card);
  }

  shuffle() : void {
    this.cards = shuffleCards(this.cards);
  }
}