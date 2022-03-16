import { ICard } from "../intefaces/ICard";
import { shuffleCards } from '../utilities/shuffle';
import { IDeckCollection } from "../intefaces/IDeckCollection";

export class DeckCollection implements IDeckCollection {
  cards: ICard[];

  constructor(cards: ICard[]) {
    this.cards = cards
  }

  draw(): ICard {
    let topCard = this.cards.pop();
    if (topCard === undefined) {
      throw Error("Error! We need more cards.");
    }
    return topCard;
  }

  peek(): ICard {
    if (this.cards.length < 1) {
      throw Error("Error! We need more cards.");
    }
    return this.cards[this.cards.length - 1];
  }

  discard(card: ICard): void {
    this.cards.push(card);
  }

  shuffle() : void {
    this.cards = shuffleCards(this.cards);
  }
}