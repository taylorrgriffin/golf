import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../App.context';
import { Game } from '../../models/Game';
import { Hand } from '../../models/Hand';
import db from '../../utilities/firebase';

const GameScreen = () => {
  const { state } = useAppContext();
  const [gameState, setGameState] = useState<Game|null>(null);
  // TODO: try path without gameid later
  const { gameId } = useParams<{gameId: string}>() as { gameId: string };
  const game = doc(collection(db, 'games'), gameId);
  
  useEffect(() => {
    onSnapshot(game, (snapshot) => {
      let data = snapshot.data();
      if (data === null || data === undefined) {
        console.error(`Got null while trying to fetch game state.`);
      }
      else {
        setGameState(data as Game);
      }
    }, (err) => {
      console.error(`Error thrown while trying to fetch game state: ${err}`);
    });
  }, []);

  // TODO: make this function less janky
  const myCards = () : Hand|null => {
    if (gameState === null || gameState === undefined) {
      return null;
    }
    
    if (gameState.players === null) {
      return null;
    }

    let self = gameState.players.filter((x) => x.id === state.user?.id);
    return self.length === 0 ? null : self[0].hand;
  }

  // TODO: do something with these cards
  console.info(myCards());
  
 return(
  <div style={styles.container}>
    <div style={styles.topHalf}>
        <span>
          <h2 style={styles.text}>Game</h2>
        </span>
    </div>
    <div style={styles.bottomHalf}>
    </div>
  </div>
 ); 
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

export { GameScreen };