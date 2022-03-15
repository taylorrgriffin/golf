import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

import db from '../utilities/firebase';
import { Game } from '../models/Game';
import { CardService } from './CardService';
import { GameStatus } from '../models/GameStatus';
import { IGame } from '../intefaces/IGame';
import { IPlayer } from '../intefaces/IPlayer';

export class GameService {
  constructor() {
    this.cardService = new CardService();
  }

  cardService: CardService;

  async initializeGame(players:IPlayer[]) : Promise<Game|null> {
    let drawPile = this.cardService.getDrawPile();
    let discardPile = this.cardService.getDiscardPile();
    let game = new Game(players, drawPile, discardPile, GameStatus.WaitingForPlayers, 0, 2);
    const docRef = doc(db, 'games', game.id);
    await setDoc(docRef, JSON.parse(JSON.stringify(game)));
    return game;
  }

  async addPlayer(joinCode: string, newPlayer: IPlayer) : Promise<boolean> {
    let docRef = doc(db, 'games', joinCode);

    let game = await this.findGame(joinCode);
    if (game === null) {
      console.error(`Unable to find game with id: ${joinCode}`);
      return false;
    }
    else {
      await updateDoc(docRef, {
        players: [...game.players, newPlayer]
      });
      return true;
    }
  }

  async findGame(joinCode: string) : Promise<IGame|null> {
    let docRef = doc(db, 'games', joinCode);
    const docSnap = await getDoc(docRef);
    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) {
      return null; // just in-case data in undefined, this prevents us from having to add a third return type
    }
    else {
      let game : IGame = {
        id: data.id,
        players: data.players,
        drawPile: data.drawPile,
        discardPile: data.discardPile,
        status: data.status,
        round: data.round,
        numberOfRounds: data.numberOfRounds
      };
      return game;
    }
  }
}