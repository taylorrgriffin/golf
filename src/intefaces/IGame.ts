import { GameStatus } from "../models/GameStatus";
import { IDeckCollection } from "../intefaces/IDeckCollection";
import { IPlayer } from "./IPlayer";

export interface IGame {
  id: string,
  players: IPlayer[],
  drawPile: IDeckCollection,
  discardPile: IDeckCollection,
  status: GameStatus,
  round: number,
  numberOfRounds: number
}