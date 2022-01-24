import React, { useState } from 'react';

import { Button, FilledInput, FormControl, InputLabel } from '@mui/material';

import { Game } from '../../models/Game';
import { GameService } from '../../services/GameService';

export const Home = () => {
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

  return (
    <div style={styles.container}>
      <div style={styles.topHalf}>
          <span>
            <Button variant="contained" color="primary" onClick={async() => {createGame()}}>
              Create Game
            </Button>
          </span>
      </div>
      <div style={styles.bottomHalf}>
        <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Join Code</InputLabel>
          <FilledInput id="component-filled" value={joinCode} onChange={async (e) => {
            e.target.value = e.target.value.toUpperCase();
            setJoinCode(e.target.value) }} />
        </FormControl>
        <Button variant="contained" color="primary" style={{ width: '190px', marginTop: '20px' }} onClick={()=>{joinGame()}}>
          Join Game
        </Button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    justifyContent: 'space-evenly',
    // backgroundColor: '#282c34' as const,
    backgroundColor: 'white' as const,
    flex: 1,
    width: '100vw',
    display: 'flex',
    flexDirection: 'column' as const
  },
  topHalf: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column' as const,
    borderBottom: '1px solid'
  },
  bottomHalf: {
    flex: 1,
    flexDirection: 'column' as const,
    display: 'flex',
    textAlign: 'center' as const,
    justifyContent: 'center',
    alignItems: 'center',
  }
}