import { Card } from "../models/Card";
import { Hand } from "../models/Hand";

export interface IPlayer {
  id: string,
  nickName: string,
  isHost: boolean,
  hand: Hand | null,
  isOut: Boolean,
  drawnCard: Card | null,
  roundScore: Number,
  gameScore: number
}