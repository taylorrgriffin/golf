import { IDeckCollection } from "../intefaces/IDeckCollection";
import { IGame } from "../intefaces/IGame";
import { IPlayer } from "../intefaces/IPlayer";
import { generateJoinCode } from "../utilities/joinCode";
import { GameStatus } from "./GameStatus";

export class Game implements IGame {
  id: string;
  players: IPlayer[];
  drawPile: IDeckCollection;
  discardPile: IDeckCollection;
  status: GameStatus;
  round: number;
  numberOfRounds: number;

  constructor(players : IPlayer[], drawPile: IDeckCollection, discardPile: IDeckCollection, status: GameStatus, round: number, numberOfRounds: number) {
    this.id = generateJoinCode();
    this.players = players;
    this.drawPile = drawPile;
    this.discardPile = discardPile;
    this.status = status;
    this.round = round;
    this.numberOfRounds = numberOfRounds;
  }
}