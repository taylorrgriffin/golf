import { doc, setDoc, getDoc } from 'firebase/firestore';

import db from '../utilities/firebase';
import { Game } from '../models/Game';
import { CardService } from './CardService';
import { GameStatus } from '../models/GameStatus';
import { IGame } from '../intefaces/IGame';

export class GameService {
  constructor() {
    this.cardService = new CardService();
  }

  cardService: CardService;

  async initializeGame() : Promise<Game|null> {
    let drawPile = this.cardService.getDrawPile();
    let discardPile = this.cardService.getDiscardPile();
    let game = new Game([], drawPile, discardPile, GameStatus.WaitingForPlayers, 0, 2);
    const docRef = doc(db, 'games', game.id);
    await setDoc(docRef, JSON.parse(JSON.stringify(game)));
    return game;
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