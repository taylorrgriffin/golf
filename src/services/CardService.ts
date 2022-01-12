import { Column } from "../models/Column";
import { Deck } from "../models/Deck";
import { DeckCollection } from "../models/DeckCollection";
import { DeckDesign } from "../models/DeckDesign";
import { Hand } from "../models/Hand";

export class CardService {
  constructor() {
    let bicycleCards = new Deck(DeckDesign.Bicycle);
    let huskersCards = new Deck(DeckDesign.Huskers);

    this.drawPile = new DeckCollection([bicycleCards.cards, huskersCards.cards].flat());
    this.drawPile.shuffle();

    this.discardPile = new DeckCollection([this.drawPile.draw()]);

    let columns: Column[] = [];
    for (let i = 0; i < 3; i++) {
      columns.push(new Column([this.drawPile.draw(), this.drawPile.draw(), this.drawPile.draw()], false));
    }

    this.hand = new Hand(columns);
  }

  private hand: Hand;
  private drawPile: DeckCollection;
  private discardPile: DeckCollection;

  public getHand = () => this.hand;
  public getDrawPile = () => this.drawPile;
  public getDiscardPile = () => this.discardPile;
}