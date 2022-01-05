import React from 'react';
import StyledButton from './Buttons/StyledButton.jsx';
import styled from 'styled-components'
import Timer from './timer.jsx'

class Rules extends React.Component {
  constructor(props) {
    super(props);

    this.feedback = []
    this.startNewGame = this.startNewGame.bind(this);
    this.showRules = this.showRules.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateDifficulty = this.updateDifficulty.bind(this);
    this.checkWinCondition = this.checkWinCondition.bind(this);

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
    this.setState({
      newGame: this.state.newGame ? false : true,
      // reset the board (all rows and current row)
    })

    // request a new solution
    this.state.newGame ? false : this.props.getSolution()
  }

  showRules() {
    this.setState({
      showRules: this.state.showRules ? false : true,
    })
    //if you have time, update the rules to reflect different difficulties
  }

  updateScore(score) {
    let newScore = this.state[score] + 1

    this.setState({
      [score]: newScore
    })

    if (score === 'lost') {
      this.startNewGame()
    }
    // update win score if player's row === solution
  }

  checkWinCondition() {
    // check condition on button click check/submit
    let { currentRow, solutionRow, feedbackRow } = this.props;
    let remainingSolution = solutionRow.slice()
    let count = 0

    for (let i = 0; i < currentRow.length; i++) {

      if (currentRow[i] === remainingSolution[i]) {
        // check if splicing here is not interfering with the conditional above i==i
        remainingSolution.splice(i, 1, -1)
        feedbackRow[i] = 'match'
      } else if (remainingSolution.indexOf(currentRow[i]) !== -1) {
        let index = remainingSolution.indexOf(currentRow[i])
        remainingSolution.splice(index, 1, -1)
        feedbackRow[i] = 'partial'
      } else {
        feedbackRow[i] = 'miss'
      }
    }

    feedbackRow.sort()

    // test the winning condition
    for (let i = 0; i < feedbackRow.length; i++) {
      if (feedbackRow[i] === 'match') {
        count++
      }

      if (count === feedbackRow.length) {
        this.updateScore('won')
      }
    }
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

    return (
      <div className='rules'>
        <StyledButton onClick={this.startNewGame}>{this.state.newGame ? 'End Game' : 'New Game'}</StyledButton>
        <StyledButton onClick={this.showRules}>{rulesButton}</StyledButton>
        {!this.state.showRules ? this.state.ruleInfo.map((rule, i) => (
          <h3 key={i}>{rule}</h3>)) : ''}
        <h2>Difficulty</h2>
        {this.state.difficulty.map((item, i) => (
          <div className='difficulty' onClick={this.updateDifficulty} key={i} id={item}>{item}</div>
        ))}
        <h3>Current Difficulty: {this.state.currentDiff}</h3>
        {this.state.currentDiff === 'Easy' ? <h5>No timer, no duplicate pegs</h5>
          : this.state.currentDiff === 'Normal' ? <h5>Timer at 60 sec, duplicate pegs</h5>
            : this.state.currentDiff === 'Hard' ? <h5>Timer at 30 sec, duplicate pegs</h5>
              : this.state.currentDiff === 'Unfair' ? <h5>Don't think, just play. Timer starts at 1000</h5>
                : ''
        }
        <div className='score'>Won: {this.state.won} Lost: {this.state.lost}</div>
        {this.state.newGame ? <Timer lost={this.state.lost} updateScore={this.updateScore} /> : <div className='timer'></div>}
        <br></br>
      </div>
    )
  }
};

export default Rules;