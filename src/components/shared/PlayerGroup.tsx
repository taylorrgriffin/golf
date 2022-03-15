import React from 'react';
import { IPlayer } from '../../intefaces/IPlayer';
import { Player } from './Player';

const PlayerGroup = ({ players } : { players: IPlayer[] }) => {
  return (
    <div style={styles.container}>
      {
        players.map((player) => {
          return <Player player={player} />
        })
      }
    </div>
  )
}

const styles = {
  container: {

  }
}

export { PlayerGroup };