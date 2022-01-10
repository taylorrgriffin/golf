import { Player } from "./Player";
import { GameStatus } from "./GameStatus";
import { IDeckCollection } from "../intefaces/IDeckCollection";

export interface IGame {
  players: Player[],
  drawPile: IDeckCollection,
  discardPile: IDeckCollection,
  status: GameStatus,
  round: number,
  numberOfRounds: number
}