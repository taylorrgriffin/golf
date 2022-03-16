import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { onSnapshot, collection, doc, setDoc, getDoc} from 'firebase/firestore';

import db from '../../utilities/firebase';
import { IPlayer } from '../../intefaces/IPlayer';
import { PlayerGroup } from '../shared/PlayerGroup';
import { useAppContext } from '../../App.context';
import { GameService } from '../../services/GameService';
import { GameStatus } from '../../models/GameStatus';
import { ICard } from '../../intefaces/ICard';
import { IDeckCollection } from '../../intefaces/IDeckCollection';
import { DeckCollection } from '../../models/DeckCollection';
import { pipeline } from 'stream';
import { IGame } from '../../intefaces/IGame';
import { Column } from '../../models/Column';
import { Game } from '../../models/Game';

const Lobby = () => {
  const { state } = useAppContext();
  // const [drawPile, setDrawPile] = useState<IDeckCollection|null>(null);
  const [gameState, setGameState] = useState<Game|null>(null);
  // const [players, setPlayers] = useState<IPlayer[]>([]);
  // TODO: try path without gameid later
  const { gameId } = useParams<{gameId: string}>() as { gameId: string };
  const game = doc(collection(db, 'games'), gameId);

  const startGame = async () => {
    const gameService = new GameService();

    if (gameState === null || gameState === undefined) {
      console.error("Game state is null when trying to start the game.");
      return;
    }

    let res = await gameService.updateGame(gameId, { ...gameState, status: GameStatus.Dealing });
    if (!res) {
      return;
    }

        // let hands = [];
        // gameState.players.forEach((player) => {
        //   if (gameState.drawPile === null) {
        //     console.error(`Can't deal cards, the draw pile is empty!`);
        //   }
        //   else {
        //     // TODO: parameterize 12 later
        //     let hand = draw(gameState.drawPile, 12);
        //     // setPlayerHand(hand, player);
        //     console.info(gameState.drawPile.cards.length);
        //   }
        // })
        // for (let i = 0; i < gameState.players.length; i++) {


        // }
  }

  // const setPlayerHand = (hand: ICard[], player: IPlayer) => {
  //   let columns = [];
  //   for (let i = 0; i < (hand.length / 3); i++) {
  //     // columns.push(new Column([new Card(hand[i*3]), hand[i*3 + 1], hand[i*3 + 2]], false));
  //   }
  // }

  // TODO: unit test this function later
  // const draw = (pile: IDeckCollection, num: number) : ICard[] => {
  //   return pile.cards.splice(-1 * num, num);
  // }

  useEffect(() => {
    onSnapshot(game, (snapshot) => {
      let data = snapshot.data();
      if (data === null || data === undefined) {
        console.error(`Got null while trying to fetch game state.`);
      }
      else {
        if (data.status === GameStatus.WaitingForPlayers) {
          setGameState(data as Game);
        }
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
            { gameState && gameState.players && <PlayerGroup players={gameState.players} /> }
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