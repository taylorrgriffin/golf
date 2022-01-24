import React from 'react';

// import { onSnapshot, collection, doc, setDoc, getDoc} from 'firebase/firestore';

import './App.css';
import Router from './router/Router';

function App() {


  // useEffect(
  //   () => 
  //     onSnapshot(collection(db, 'games'), (snapshot) => 
  //       console.log(snapshot.docs.map((doc) => doc.data()))
  //     ),
  //   []
  // );

  return (
    <div className="App">
      <div className="App-container">
        <Router/>
      </div>
    </div>
  );
}

export default App;
