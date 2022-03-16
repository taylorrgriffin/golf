import { ICard } from "./ICard";
import { Hand } from "../models/Hand";

export interface IPlayer {
  id: string,
  nickName: string,
  isHost: boolean,
  hand: Hand | null,
  isOut: Boolean,
  drawnCard: ICard | null,
  roundScore: Number,
  gameScore: number
}