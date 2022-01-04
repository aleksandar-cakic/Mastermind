import React from 'react';
import Board from './components/board.jsx';
import Input from './components/input.jsx';
import Rules from './components/rules.jsx';
import Feedback from './components/feedback.jsx';
import Options from './components/options.jsx';

import './stylesheets/Board.css';

class App extends React.Component {

  render() {
    return (



      <div className='App'>
        <h1>Mastermind</h1>
        <Rules />
        <div className='board'>
          <Board />
          <Feedback />
        </div>
        <div className='input'>
          <Input />
        </div>
        <div className='options'>
          <Options />
        </div>
      </div>
    )
  }
};

export default App;