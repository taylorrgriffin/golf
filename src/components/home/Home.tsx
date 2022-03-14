import React, { useState } from 'react';

import { Button, FilledInput, FormControl, InputLabel } from '@mui/material';

import { Game } from '../../models/Game';
import { GameService } from '../../services/GameService';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [game, setGame] = useState<Game>();
  const [joinCode, setJoinCode] = useState('');

  const navigate = useNavigate();
  const gameService = new GameService();

  const goToLobby = (gameId:string) => {
    navigate(`/lobby/${gameId}`);
  }

  const joinGame = async () => {
    let game = await gameService.findGame(joinCode);
    if (game == null) {
      // TODO: throw this in error banner
      console.info("Could not find game");
    }
    else {
      goToLobby(game.id);
    }
  }

  const createGame = async () => {
    let game = await gameService.initializeGame();
    if (game == null) {
      // TODO: throw this in error banner
      console.info("Could not create game");
    }
    else {
      goToLobby(game.id);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.topHalf}>
          <span>
            <Button variant="contained" color="primary" onClick={createGame}>
              Create Game
            </Button>
          </span>
      </div>
      <div style={styles.bottomHalf}>
        <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Join Code</InputLabel>
          <FilledInput id="component-filled" value={joinCode} onChange={async (e) => {
            setJoinCode(e.target.value.toUpperCase()) }} />
        </FormControl>
        <Button variant="contained" color="primary" style={{ width: '190px', marginTop: '20px' }} onClick={joinGame}>
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