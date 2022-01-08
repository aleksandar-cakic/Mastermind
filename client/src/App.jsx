import React from 'react';
import Board from './components/board.jsx';
import Input from './components/input.jsx';
import Rules from './components/rules.jsx';
import axios from 'axios';

import './stylesheets/Board.css';

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

    this.solutionRow = [];
    this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'brown'];
    this.currentRow = ['1', '2', '2', '4'];
    this.feedbackRow = []
    this.trueFeedback = []
    this.pegs = []

    this.state = {
      currentDiff: 'Normal',
      currentRow: ['1', '2', '2', '4'],
      feedbackRow: [],
      pegs: [],
      totalRows: 10,
      isChecked: false,
      newGame: false,
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
    }
  }

  restartGame() {
    window.location.reload()
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
      gameOver: true
    })

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
    } else {
      axios.get('/api/randomUniqueNum')
        .then(function (response) {
          if (response.data) {
            let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            _this.solutionRow = data.split('')
            _this.setState({
              solutionRow: _this.solutionRow
            }, () => {
              console.log(_this.solutionRow)
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  componentDidMount() {
    this.getSolution()
  }

  checkWinCondition(newPegs, allPegs, newFeedback) {
    let currentRow = newPegs.slice(0, 4);
    let feedbackRow = newPegs[4];
    let { solutionRow } = this;
    let remainingSolution = solutionRow.slice()
    let count = 0

    for (let i = 0; i < currentRow.length; i++) {

      if (currentRow[i].value === remainingSolution[i]) {
        remainingSolution.splice(i, 1, -1)
        feedbackRow[i] = 'match'
      } else if (remainingSolution.indexOf(currentRow[i].value) !== -1) {
        let index = remainingSolution.indexOf(currentRow[i].value)
        remainingSolution.splice(index, 1, -1)
        feedbackRow[i] = 'partial'
      } else {
        feedbackRow[i] = 'miss'
      }
    }

    feedbackRow.sort()
    this.trueFeedback.push(this.feedbackRow)

    this.setState(prevState => ({
      feedbackRow: {
        ...prevState.feedbackRow,
        [this.trueFeedback.length - 1]: this.feedbackRow
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

  render() {
    return (
      <div className='App'>
        <div className='title'>
          <h1 className='logo'>Master</h1>
          <h1 className='logo2'>mind</h1>
        </div>
        <Rules currentDiff={this.state.currentDiff} getSolution={this.getSolution}
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
        />
        <Input colors={this.colors} handleColorClick={this.handleColorClick} />

        <div className='board'>
          <Board
            test={this.state.feedbackRow}
            feedbackRow={this.feedbackRow}
            data={this.pegs}
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
          />
          {this.state.gameOver ? <div>Solution: {this.state.solutionRow}</div> : null}

        </div>
      </div>
    )
  }
};

export default App;