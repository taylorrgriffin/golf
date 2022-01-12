import { Hand } from "./Hand";
import { Card } from "./Card";
import { IPlayer } from "../intefaces/IPlayer";

export class Player implements IPlayer {
  nickName: string;
  hand: Hand | null;
  isOut: Boolean;
  drawnCard: Card | null;
  roundScore: Number;
  gameScore: number;

  constructor(nickName: string, hand: Hand | null, isOut: Boolean, drawnCard: Card | null, roundScore: number, gameScore: number) {
    this.nickName = nickName;
    this.hand = hand;
    this.isOut = isOut;
    this.drawnCard = drawnCard;
    this.roundScore = roundScore;
    this.gameScore = gameScore;
  }
}