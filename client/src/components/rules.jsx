import React from 'react';
import StyledButton from './Buttons/StyledButton.jsx';
import styled from 'styled-components'
import Timer from './timer.jsx'
import '../stylesheets/rules.css'

class Rules extends React.Component {
  constructor(props) {
    super(props);

    this.feedback = []
    this.showRules = this.showRules.bind(this);
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
      difficulty: ['Easy', 'Normal', 'Hard', 'Unfair'],
      currentDiff: 'Normal',
      style: 'normal'
    }
  }

  showRules() {
    this.setState({
      showRules: this.state.showRules ? false : true,
    })
    //if you have time, update the rules to reflect different difficulties
  }

  updateDifficulty(e, item) {
    // duplicate vs no duplicate pegs
    // timer reduced per progress
    this.setState({
      currentDiff: e.target.id
    })
    // update current difficulty in bold
    // update game difficulty with timer and with more pegs/options

    //easy - no timer, no duplicates
    // normal - timer at 60, duplicates
    // hard - timer at 30, duplicates
    // unfair - vreme krece od sesdeset i spusta se dva puta brze nego normalno, nakon svakog reda, smanjuje se za dve sekunde. nakon petog reda, otvara se drugi red boja. na deveti red, vreme se spusta na deset sekunde, rules ? Don't think, just play Good luck
  }

  render() {
    const rulesButton = this.state.showRules ? 'Show Rules' : 'Hide Rules';
    const currentDifficulty = this.state.currentDiff === 'Easy' ? <h4>No timer, no duplicate pegs</h4>
      : this.state.currentDiff === 'Normal' ? <h4>Timer at 60 sec, duplicate pegs</h4>
        : this.state.currentDiff === 'Hard' ? <h4>Timer at 30 sec, duplicate pegs</h4>
          : this.state.currentDiff === 'Unfair' ? <h4>Don't think, just play. Timer starts at 1000</h4>
            : ''

    return (
      <div className='rules'>
        <StyledButton onClick={this.props.startNewGame}>{this.props.newGame ? 'End Game' : 'New Game'}</StyledButton>
        <StyledButton onClick={this.showRules}>{rulesButton}</StyledButton>
        {!this.state.showRules ? this.state.ruleInfo.map((rule, i) => (
          <h3 key={i}>{rule}</h3>)) : ''}
        <h2>Difficulty</h2>
        <div className='difficulty'>
          {this.state.difficulty.map((item, i) => (
            <div onClick={this.updateDifficulty} key={i} id={item}>{item}</div>
          ))}
        </div>
        <h3>Current Difficulty: {this.state.currentDiff}</h3>
        {currentDifficulty
        }
        <div className='score'>Won: {this.props.won} Lost: {this.props.lost}</div>
        <div className='remainingGuesses'>{`${this.props.remainingGuesses} guesses remaining`}</div>
        {this.props.newGame ? <Timer lost={this.props.lost} updateScore={this.props.updateScore} /> : <div className='timer'></div>}
        <br></br>
      </div>
    )
  }
};

export default Rules;