import React from 'react';
import { AppContextProvider } from './App.context';

import './App.css';
import Router from './router/Router';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <div className="App-container">
          <Router/>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
