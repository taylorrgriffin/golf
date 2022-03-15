import React from 'react';
import { IPlayer } from '../../intefaces/IPlayer';

const Player = ({ player } : { player: IPlayer }) => {
  return (
    <div style={styles.container}>
      {player.nickName}
      {player.isHost && " (host)"}
    </div>
  )
}

const styles = {
  container: {
    color: 'black'
  }
}

export { Player };