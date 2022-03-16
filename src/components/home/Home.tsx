import React, { useState } from 'react';

import { Button, FilledInput, FormControl, InputLabel } from '@mui/material';

import { GameService } from '../../services/GameService';
import { useNavigate } from 'react-router-dom';
import { IPlayer } from '../../intefaces/IPlayer';
import { generatePlayerId } from '../../utilities/codes';
import { useAppContext } from '../../App.context';

export const Home = () => {
  const { dispatch } = useAppContext();
  const [nickname, setNickname] = useState<string>('');
  const [nicknameConfirmed, setNicknameConfirmed] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const navigate = useNavigate();
  const gameService = new GameService();

  const goToLobby = (gameId:string, player:IPlayer) => {
    navigate(`/lobby/${gameId}`, { state: { self: player } });
  }

  const joinGame = async () => {
    let self = getPlayer(nickname, false);
    setUserInContext(self);

    let game = await gameService.findGame(joinCode);
    if (game == null) {
      // TODO: throw this in error banner
      console.info("Could not find game");
    }
    else {
      let addPlayer = await gameService.addPlayer(joinCode, self);
      if (!addPlayer) {
        // TODO: throw this in error banner
        console.error("Unable to add self to game")
      }
      else {
        goToLobby(game.id, self);
      }
    }
  }

  const getPlayer = (nickName: string, isHost: boolean) => {
    return {
      id: generatePlayerId(),
      nickName,
      isHost,
      hand: null,
      isOut: false,
      drawnCard: null,
      roundScore: 0,
      gameScore: 0
    }
  }

  const setUserInContext = (self: IPlayer) => {
    dispatch({
      type: 'setUser',
      payload: { user: self }
    });
  }

  const createGame = async () => {
    let self = getPlayer(nickname, true);
    setUserInContext(self);

    let game = await gameService.initializeGame([self]);
    if (game == null) {
      // TODO: throw this in error banner
      console.info("Could not create game");
    }
    else {
      goToLobby(game.id, self);
    }
  }

  const confirmNickname = () => {
    setNicknameConfirmed(true);
  }

  const gameSetupScreen = () => (
    <div style={styles.container}>
      <div style={styles.topHalf}>
        <div style={{ flexDirection: 'column', color: 'black', flex: 1 }}>
          {/* TODO: display nickname */}
          {/* {nickname} */}
          <Button variant="contained" color="primary" onClick={createGame}>
            Create Game
          </Button>
        </div>
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
  );

  const nicknameScreen = () => (
    // TODO: styling
    <div style={styles.container}>
       <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Nickname</InputLabel>
          <FilledInput id="component-filled" value={nickname} onChange={async (e) => {
            setNickname(e.target.value) }} />
        </FormControl>
        <Button variant="contained" color="primary" style={{ width: '190px', marginTop: '20px' }} onClick={confirmNickname}>
          Confirm
        </Button>
    </div>
  );

  return (
    <>
      { nicknameConfirmed ? gameSetupScreen() : nicknameScreen() }
    </>
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