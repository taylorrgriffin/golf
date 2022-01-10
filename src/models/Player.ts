import { Card } from "./Card";
import { Hand } from "./Hand";

export interface Player {
  nickName: string,
  hand: Hand,
  isOut: Boolean,
  drawnCard: Card,
  roundScore: Number,
  gameScore: number
}