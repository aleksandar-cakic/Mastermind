import React from 'react';
import Board from './components/board.jsx';
import Input from './components/input.jsx';
import Rules from './components/rules.jsx';
import DarkToggle from './components/darkToggle.jsx'
import axios from 'axios';
import './stylesheets/Board.css';
import './stylesheets/input.css';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getSolution = this.getSolution.bind(this)
    this.checkWinCondition = this.checkWinCondition.bind(this)
    this.updateScore = this.updateScore.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.updateRowCount = this.updateRowCount.bind(this);
    this.updateDifficulty = this.updateDifficulty.bind(this);
    this.resetState = this.resetState.bind(this)
    this.firstTimeSetup = this.firstTimeSetup.bind(this)
    this.playAgainSetup = this.playAgainSetup.bind(this)
    this.revealHint = this.revealHint.bind(this)

    this.solutionRow = [];
    this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'brown', 'salmon', 'lime', 'gold', 'pink', 'black', 'grey', 'magenta'
    ];
    this.currentRow = ['1', '2', '2', '4'];
    this.feedbackRow = []
    this.trueFeedback = []
    this.pegs = []

    this.firstTimeSetup()
  }

  firstTimeSetup() {
    this.state = {
      currentDiff: 'Normal',
      currentRow: ['1', '2', '2', '4'],
      feedbackRow: [],
      pegs: [],
      totalRows: 10,
      newGame: false,
      isChecked: null,
      won: 0,
      lost: 0,
      solutionRow: this.solutionRow,
      color: 'white',
      colorNum: 0,
      one: { color: 'white', num: 0 },
      two: { color: 'white', num: 0 },
      three: { color: 'white', num: 0 },
      four: { color: 'white', num: 0 },
      gameOver: false,
      gameWon: false,
      hint: '',
      hint2: '',
      hintRevealed: { one: false, two: false },
    }
  }

  playAgainSetup() {
    this.setState({
      currentDiff: 'Normal',
      feedbackRow: [],
      pegs: [],
      totalRows: 10,
      newGame: false,
      color: 'white',
      colorNum: 0,
      one: { color: 'white', num: 0 },
      two: { color: 'white', num: 0 },
      three: { color: 'white', num: 0 },
      four: { color: 'white', num: 0 },
      gameOver: false,
      gameWon: false,
      addForm: {
        one: '',
        two: '',
        three: '',
        four: '',
      },
      hint: '',
      hint2: '',
      hintRevealed: 'Click to reveal hint'
    })
  }

  restartGame() {
    this.playAgainSetup()
  }

  updateDifficulty(event) {
    this.setState({
      currentDiff: event.target.id
    })
  }
  updateRowCount() {
    this.setState({
      totalRows: this.state.totalRows - 1
    })
  }

  handleColorClick(event) {
    event.target.classList.add('border_checked')
    this.setState({
      color: event.target.id,
      colorNum: event.target.getAttribute('value')
    })
  }

  updateColor(event) {
    this.setState({
      [event.target.name]: { color: this.state.color, num: this.state.colorNum }
    })
  }

  startNewGame() {
    console.log('Difficulty: ', this.state.currentDiff)
    this.setState({
      newGame: this.state.newGame ? false : true,
      gameOver: false
    })
    this.state.newGame ? false : this.getSolution()
  }

  updateScore(score) {
    let newScore = this.state[score] + 1

    this.setState({
      [score]: newScore,
      gameOver: true,
    })

    if (score === 'won') {
      this.setState({
        gameWon: true
      })
    } else {
      this.setState({
        gameWon: false
      })
    }
  }

  getSolution() {
    const _this = this;
    if (this.state.currentDiff === 'Easy') {
      axios.get('/api/randomNum')
        .then(function (response) {
          if (response.data) {
            let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            _this.solutionRow = data.split('')
            _this.setState({
              solutionRow: _this.solutionRow
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else if (this.state.currentDiff === 'Unfair') {
      axios.get('/api/unfairNum')
        .then(function (response) {
          if (response.data) {
            let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            if (data.split('').length > 4) {
              _this.solutionRow = data.split('').slice(0, 4)
            } else {
              _this.solutionRow = data.split('')
            }

            _this.setState({
              solutionRow: _this.solutionRow
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      axios.get('/api/randomUniqueNum')
        .then(function (response) {
          if (response.data) {
            let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            _this.solutionRow = data.split('')
            _this.setState({
              solutionRow: _this.solutionRow
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  checkWinCondition(newPegs, allPegs) {
    let currentRow = newPegs.slice(0, 4);
    let feedbackRow = newPegs[4];
    let { solutionRow } = this;
    let remainingSolution = solutionRow.slice()
    let count = 0

    for (let i = 0; i < currentRow.length; i++) {
      if (currentRow[i].value === remainingSolution[i]) {
        remainingSolution.splice(i, 1, -1)
        feedbackRow[i] = 'match'
        console.log('hit MATCH')
        continue;
      } else {
        console.log('hit MISS')
        feedbackRow[i] = 'miss'
      }
    }

    for (let i = 0; i < currentRow.length; i++) {
      if (remainingSolution.indexOf(currentRow[i].value) !== -1) {
        console.log('hit PARTIAL')
        let index = remainingSolution.indexOf(currentRow[i].value)
        remainingSolution.splice(index, 1, -1)
        feedbackRow[i] = 'partial'
        continue
      }
    }

    feedbackRow.sort()
    this.trueFeedback.push(this.feedbackRow)

    this.setState(prevState => ({
      feedbackRow: {
        ...prevState.feedbackRow,

      }
    }))

    for (let i = 0; i < feedbackRow.length; i++) {
      if (feedbackRow[i] === 'match') {
        count++
      }

      if (count === 4) {
        this.updateScore('won')
      }
    }

    if (allPegs.length === 10 && count !== 4) {
      this.updateScore('lost')
    }
  }

  resetState() {
    this.setState({
      one: { color: 'white', num: 0 },
      two: { color: 'white', num: 0 },
      three: { color: 'white', num: 0 },
      four: { color: 'white', num: 0 },
    })
  }

  revealHint(event) {
    let hintNumber = event.target.getAttribute('name')
    this.setState({
      hint: this.colors[this.solutionRow.slice(1, 2)],
      hint2: this.colors[this.solutionRow.slice(2, 3)],
    })

    if (hintNumber === 'one') {
      this.setState(prevState => ({
        hintRevealed: { one: true, two: prevState.hintRevealed.two }
      }))
    } else {
      this.setState(prevState => ({
        hintRevealed: { one: prevState.hintRevealed.one, two: true }
      }))
    }
  }

  render() {
    return (
      <div className='App' >
        <div className='title'>
          <h1 className='logo'>Master</h1>
          <h1 className='logo2'>mind</h1>
        </div>
        <DarkToggle />
        <Rules
          currentDiff={this.state.currentDiff} getSolution={this.getSolution}
          solutionRow={this.state.solutionRow}
          currentRow={this.state.currentRow}
          feedbackRow={this.state.feedbackRow}
          newGame={this.state.newGame}
          startNewGame={this.startNewGame}
          updateScore={this.updateScore}
          remainingGuesses={this.state.totalRows}
          currentDiff={this.state.currentDiff}
          updateDifficulty={this.updateDifficulty}
          gameOver={this.state.gameOver}
          won={this.state.won}
          lost={this.state.lost}
          gameWon={this.state.gameWon}
        />

        <Input
          currentDiff={this.state.currentDiff}
          colors={this.colors}
          currentColor={this.state.color}
          handleColorClick={this.handleColorClick} />

        <Board
          test={this.state.feedbackRow}
          feedbackRow={this.state.feedbackRow}
          data={this.state.pegs}
          checkWinCondition={this.checkWinCondition}
          newGame={this.state.newGame}
          isChecked={this.state.isChecked}
          color={this.state.color}
          updateColor={this.updateColor}
          one={this.state.one}
          two={this.state.two}
          three={this.state.three}
          four={this.state.four}
          colorNum={this.state.colorNum}
          updateRowCount={this.updateRowCount}
          remainingGuesses={this.state.totalRows}
          gameOver={this.state.gameOver}
          won={this.state.won}
          lost={this.state.lost}
          restartGame={this.restartGame}
          resetState={this.resetState}
          gameWon={this.state.gameWon}
          addForm={this.state.addForm}
          revealHint={this.revealHint}
          hint={this.state.hint}
          hint2={this.state.hint2}
          hintRevealed={this.state.hintRevealed}
        />

        {
          this.state.gameOver ?
            <div className='solution'>
              <div>Solution</div>
              {this.state.solutionRow.map((solution, i) => (
                <div key={i} className={`circle ${solution}`} id={this.colors[solution]}></div>
              ))}
            </div>
            : null
        }
      </div >

    )
  }
};

export default App;