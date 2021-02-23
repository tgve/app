import React from 'react';
import Eatlas from 'eatlas';

import './App.css';

function App() {
  return (
    <Eatlas defaultURL={process.env.DEFAULT_URL}/>
  );
}

export default App;
