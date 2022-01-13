import React, { useEffect, useState } from 'react';
import { Button, Input } from '@mui/material';
import { onSnapshot, collection, doc, setDoc, getDoc} from 'firebase/firestore';

import './App.css';
import { Game } from './models/Game';
import { GameService } from './services/GameService';

function App() {
  const [game, setGame] = useState<Game>();
  const [joinCode, setJoinCode] = useState('');

  const gameService = new GameService();

  const joinGame = async () => {
    let game = await gameService.findGame(joinCode);
    if (game == null) {
      console.info("Could not find game");
    }
    else {
      setGame(game);
    }
  }

  const createGame = async () => {
    let game = await gameService.initializeGame();
    if (game == null) {
      console.info("Could not create game");
    }
    else {
      setGame(game);
    }
  }

  // useEffect(
  //   () => 
  //     onSnapshot(collection(db, 'games'), (snapshot) => 
  //       console.log(snapshot.docs.map((doc) => doc.data()))
  //     ),
  //   []
  // );

  return (
    <div className="App">
      <div className="App-container">
        <Button variant="contained" color="primary" onClick={async() => {createGame()}}>
          Create Game
        </Button>
        <Input onChange={async (e) => {
          setJoinCode(e.target.value);
        }} />
        <Button variant="contained" color="primary" onClick={()=>{joinGame()}}>
          Join Game
        </Button>
      </div>
    </div>
  );
}

export default App;
