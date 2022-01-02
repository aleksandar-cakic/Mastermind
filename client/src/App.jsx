import React from 'react';
import Board from './components/board.jsx';
import Rules from './components/rules.jsx';
import Feedback from './components/feedback.jsx';

const App = () => (
  <div className='mastermind'>
    <h1>Mastermind</h1>
    <Rules />
    <Board />
    <Feedback />
  </div>
);

export default App;