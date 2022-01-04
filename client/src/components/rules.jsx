import React from 'react';
import StyledButton from './Buttons/StyledButton.jsx';
import styled from 'styled-components'
import Timer from './timer.jsx'

class Rules extends React.Component {
  constructor(props) {
    super(props);

    this.startNewGame = this.startNewGame.bind(this);
    this.showRules = this.showRules.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateDifficulty = this.updateDifficulty.bind(this);

    this.state = {
      showRules: true,
      ruleInfo: ['Game rules',
      `• At the start of the game the computer will randomly select a pattern of four different
      numbers from a total of 8 different numbers.`,
      `• A player will have 10 attempts to guess the number combinations`,
      `• At the end of each guess, computer will provide one of the following response
      as feedback:`,
     `• The player had guess a correct number`,
     `• The player had guessed a correct number and its correct location`,
      `• The player’s guess was incorrect`,
      `**Note that the computer’s feedback does not reveal which number the player guessed
      correctly`],
      newGame: false,
      difficulty: ['Easy', 'Normal', 'Hard', 'Unfair'],
      currentDiff: 'Normal',
      won: 0,
      lost: 0,
      style: 'normal'
    }
  }

  startNewGame() {
    console.log('Clicked New Game Btn')
    this.setState({
      newGame: this.state.newGame ? false : true,
      // reset the board
    })
  }

  showRules() {
    console.log('Clicked on Rules Btn')
    this.setState({
      showRules: this.state.showRules ? false : true,
    })
  }

  updateScore(score) {
    let newScore = this.state[score] + 1

    this.setState({
      [score]: newScore
    })

    if (score === 'lost') {
      this.startNewGame()
    }
  }

  updateDifficulty(e, item) {
    this.setState({
      currentDiff: e.target.id
    })
    // update current difficulty in bold
    // update game difficulty with timer and with more pegs/options
  }

  render() {
    const rulesButton = this.state.showRules ? 'Show Rules' : 'Hide Rules';

    return (
      <div className='rules'>
        <StyledButton onClick={this.startNewGame}>New Game</StyledButton>
        <StyledButton onClick={this.showRules}>{rulesButton}</StyledButton>
          {!this.state.showRules ? this.state.ruleInfo.map((rule, i) => (
          <h3 key={i}>{rule}</h3>)) : ''}
          <h2>Difficulty</h2>
        {this.state.difficulty.map((item, i) => (
          <div className='difficulty' onClick={this.updateDifficulty} key={i} id={item}>{item}</div>
        ))}
        <h3>Current Difficulty: {this.state.currentDiff}</h3>

        <div className='score'>Won: {this.state.won} Lost: {this.state.lost}</div>
        {this.state.newGame ? <Timer lost={this.state.lost} updateScore={this.updateScore} /> : <div className='timer'></div>}
        <br></br>
      </div>
    )
  }
};

export default Rules;