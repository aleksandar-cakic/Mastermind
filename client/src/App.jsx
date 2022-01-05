import React from 'react';
import Board from './components/board.jsx';
import Input from './components/input.jsx';
import Rules from './components/rules.jsx';
import Feedback from './components/feedback.jsx';
import Options from './components/options.jsx';
import Pegs from './components/pegs.jsx'
import axios from 'axios';

import './stylesheets/Board.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getSolution = this.getSolution.bind(this)

    this.solutionRow = [];
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'brown'];

    this.state = {
      currentDiff: 'Normal',
      currentRow: ['4', '2', '1', '1'],
      feedbackRow: ['','','',''],
      totalRows: 10,
      colors: colors,
      solutionRow: this.solutionRow,
    }
  }

  getSolution() {
    const _this = this;
    axios.get('http://www.random.org/integers/?num=4&min=0&max=7&rnd=new&base=10&col=1&format=plain')
      .then(function (response) {
        if (response.data) {

          let data = response.data.replace(/(\r\n|\n|\r)/gm, "");
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

  componentDidMount() {
    this.getSolution()
  }

  render() {
    return (
      <div className='App'>
        <h1>Mastermind</h1>
        <Rules currentDiff={this.state.currentDiff} getSolution={this.getSolution}
        solutionRow={this.state.solutionRow}
        currentRow={this.state.currentRow}
        feedbackRow={this.state.feedbackRow}/>
        <div className='board'>
          <Board totalRows={this.state.totalRows} solutionRow={this.state.solutionRow} />
          <div>{this.state.solutionRow}</div>
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