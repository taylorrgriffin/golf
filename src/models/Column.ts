import { Card } from "./Card";
import { IColumn } from "../intefaces/IColumn";
import { CardPosition } from "./CardPosition";

export class Column implements IColumn {
  cards: [Card, Card, Card];
  isCleared: Boolean;

  constructor(cards: [Card, Card, Card], isCleared : Boolean) {
    this.cards = cards;
    this.isCleared = isCleared;
  }

  replace(position: CardPosition, card: Card) : Card {
    let index = position.valueOf();
    
    let tmp = this.cards[index];
    this.cards[index] = card;
    this.cards[index].flipFaceUp();

    return tmp;
  }

  isMatched() : Boolean {
    return this.cards[CardPosition.Top.valueOf()].value
      == this.cards[CardPosition.Middle.valueOf()].value
      && this.cards[CardPosition.Middle.valueOf()].value 
      == this.cards[CardPosition.Bottom.valueOf()].value
  }

  isMatchedSuits() : Boolean {
    return this.cards[CardPosition.Top.valueOf()].suit
    == this.cards[CardPosition.Middle.valueOf()].suit
    && this.cards[CardPosition.Middle.valueOf()].suit 
    == this.cards[CardPosition.Bottom.valueOf()].suit
  }

  isFullyFaceUp() : Boolean {
    return (!this.cards[CardPosition.Top.valueOf()].faceDown)
    && (!this.cards[CardPosition.Middle.valueOf()].faceDown)
    && (!this.cards[CardPosition.Bottom.valueOf()].faceDown)
  }

  clear() : void {
    this.isCleared = true;
  }
}