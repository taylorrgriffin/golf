import React from 'react';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const startGame = () => {
  
}

const Lobby = () => {
  const { gameId } = useParams();
  return (
    <div style={styles.container}>
      <div style={styles.topHalf}>
          <span>
            <h2 style={styles.text}>Lobby</h2>
            <h2 style={styles.text}>Join code: {gameId}</h2>
            <h4 style={styles.text}>Waiting for players...</h4>
          </span>
      </div>
      <div style={styles.bottomHalf}>
        <Button onClick={startGame}>Start game</Button>
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