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
      style: 'normal',
    }
  }

  showRules() {
    this.setState({
      showRules: this.state.showRules ? false : true,
    })
  }

  updateDifficulty(e, item) {
    this.setState({
      currentDiff: e.target.id
    })
  }

  render() {
    const rulesButton = this.state.showRules ? 'Show Rules' : 'Hide Rules';
    const currentDifficulty = this.props.currentDiff === 'Easy' ? <div>Timer at 90 sec with duplicate pegs</div>
      : this.props.currentDiff === 'Normal' ? <div>Timer at 60 sec with unique pegs</div>
        : this.props.currentDiff === 'Hard' ? <div>Timer at 30 sec with unique pegs</div>
          : this.props.currentDiff === 'Unfair' ? <div>Don't think, just play.</div>
            : ''

    return (
      <div className='rules'>
        {this.props.newGame ? null :
          <div>
            <StyledButton onClick={this.props.startNewGame}>Start Game</StyledButton>
            <StyledButton onClick={this.showRules}>{rulesButton}</StyledButton>
            {!this.state.showRules ? this.state.ruleInfo.map((rule, i) => (
              <h5 key={i}>{rule}</h5>)) : ''}
            <div className='difficulty'>
              {this.state.difficulty.map((item, i) => (
                <div className={item === this.props.currentDiff ? 'currentDifficulty' : ''} onClick={this.props.updateDifficulty} key={i} id={item}>{item}</div>
              ))}
            </div>
          </div>
        }
        {!this.props.newGame ? currentDifficulty : null}
        {this.props.newGame ? <Timer lost={this.props.lost} updateScore={this.props.updateScore} currentDiff={this.props.currentDiff} gameOver={this.props.gameOver} /> : <div className='timer'></div>}

{/* {this.props.gameOver ? this.props.gameWon ? <div className='score'>YOU WON!!!</div> : <div className='score'>YOU LOST :((</div> : null} */}

        <br></br>
        <div>Win: {this.props.won} Lost: {this.props.lost}</div>
      </div>
    )
  }
};

export default Rules;