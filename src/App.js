import React from 'react';
import Tgve from '@tgve/tgvejs';

import './App.css';

function App() {
  return (
    <Tgve defaultURL={process.env.REACT_APP_DEFAULT_URL}/>
  );
}

export default App;
