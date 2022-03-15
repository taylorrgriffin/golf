import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { onSnapshot, collection, doc, setDoc, getDoc} from 'firebase/firestore';

import db from '../../utilities/firebase';
import { IPlayer } from '../../intefaces/IPlayer';
import { PlayerGroup } from '../shared/PlayerGroup';
import { useAppContext } from '../../App.context';


const startGame = () => {
  
}

const Lobby = () => {
  const { state } = useAppContext();
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const { gameId } = useParams();
  const game = doc(collection(db, 'games'), gameId);

  

  useEffect(() => {
    onSnapshot(game, (snapshot) => {
      // TODO: add type safety to this?
      let data = snapshot.data();
      if (data === null || data === undefined) {
        console.error(`Got null while trying to fetch game state.`);
      }
      else {
        setPlayers(data.players);
      }
    }, (err) => {
      console.error(`Error thrown while trying to fetch game state: ${err}`);
    });
  }, []);

  console.info(state);

  return (
    <div style={styles.container}>
      <div style={styles.topHalf}>
          <span>
            <h2 style={styles.text}>Lobby</h2>
            <h2 style={styles.text}>Join code: {gameId}</h2>
            <h4 style={styles.text}>Waiting for players...</h4>
            <PlayerGroup players={players} />
          </span>
      </div>
      <div style={styles.bottomHalf}>
        {state.user && state.user.isHost && <Button onClick={startGame}>Start game</Button>}        
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
  },
  text: {
    color: 'black'
  }
}

export { Lobby };