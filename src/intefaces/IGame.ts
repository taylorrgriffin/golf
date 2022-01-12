import { Player } from "../models/Player";
import { GameStatus } from "../models/GameStatus";
import { IDeckCollection } from "../intefaces/IDeckCollection";

export interface IGame {
  players: Player[],
  drawPile: IDeckCollection,
  discardPile: IDeckCollection,
  status: GameStatus,
  round: number,
  numberOfRounds: number
}