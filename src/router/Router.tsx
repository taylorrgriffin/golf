import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home } from '../components/home/Home';
import { Lobby } from '../components/lobby/Lobby';
import { GameScreen } from '../components/game/Game';
import Header from "../components/shared/Header";
import { PageNotFound } from '../components/shared/PageNotFound';

const Router = () => {
  return (
    <div style={styles.body}>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby/:gameId" element={<Lobby/>} />
            <Route path="/game/:gameId" element={<GameScreen/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

const styles = {
  body: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    flexDirection: 'column' as const
  }
}

export default Router;