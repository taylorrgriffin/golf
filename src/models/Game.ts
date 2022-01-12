import { IDeckCollection } from "../intefaces/IDeckCollection";
import { IGame } from "../intefaces/IGame";
import { GameStatus } from "./GameStatus";
import { Player } from "./Player";

export class Game implements IGame {
  players: Player[];
  drawPile: IDeckCollection;
  discardPile: IDeckCollection;
  status: GameStatus;
  round: number;
  numberOfRounds: number;

  constructor(players : Player[], drawPile: IDeckCollection, discardPile: IDeckCollection, status: GameStatus, round: number, numberOfRounds: number) {
    this.players = players;
    this.drawPile = drawPile;
    this.discardPile = discardPile;
    this.status = status;
    this.round = round;
    this.numberOfRounds = numberOfRounds;
  }
}