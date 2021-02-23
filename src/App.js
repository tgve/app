import React from 'react';
import Eatlas from 'eatlas';

import './App.css';

function App() {
  return (
    <Eatlas defaultURL={process.env.REACT_APP_DEFAULT_URL}/>
  );
}

export default App;
