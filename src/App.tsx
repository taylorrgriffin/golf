import React, { useEffect, useState } from 'react';

import db from './utilities/firebase';
import { onSnapshot, collection, doc, setDoc, getDoc} from 'firebase/firestore';

import './App.css';
import { Game } from './models/Game';
import { Player } from './models/Player';
import { GameStatus } from './models/GameStatus';
import { generateJoinCode } from './utilities/joinCode';
import { CardService } from './services/CardService';

function App() {
  const [game, setGame] = useState<Game>();
  const [player, setPlayer] = useState<Player>();
  const [ joinCode, setJoinCode ] = useState("");

  const cardService = new CardService();
  // useEffect(
  //   () => 
  //     onSnapshot(collection(db, 'games'), (snapshot) => 
  //       console.log(snapshot.docs.map((doc) => doc.data()))
  //     ),
  //   []
  // );

  const createGame = async () => {
    let code = generateJoinCode();
    
    // let hand = cardService.getHand();
    let drawPile = cardService.getDrawPile();
    let discardPile = cardService.getDiscardPile();

    let player = new Player("Tay", null, false, null, 0, 0);
    let game = new Game([], drawPile, discardPile, GameStatus.WaitingForPlayers, 0, 2);

    setGame(game);
    setPlayer(player);
    setJoinCode(code);

    const docRef = doc(db, 'games', code);
    setDoc(docRef, JSON.parse(JSON.stringify(game)));
  }

  return (
    <div className="App">
      <div className="App-container">
        <h2>{joinCode}</h2>
        <button onClick={async () => {
          createGame();
        }}>Create Game</button>
        <input onChange={(e) => { setJoinCode(e.currentTarget.value); }} />
        <button onClick={async () => {
          let docRef = doc(db, 'games', joinCode)
          const docSnap = await getDoc(docRef)
          const data = docSnap.exists() ? docSnap.data() : null
          if (data === null || data === undefined) {
            console.info("Unable to find game...");
          }
          else {
            console.info("Found the game!");
          }
        }}>Join Game</button>
      </div>
    </div>
  );
}

export default App;
