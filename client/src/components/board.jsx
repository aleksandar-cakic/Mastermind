import React from 'react';
import Row from './row.jsx'
import RowCheck from './rowCheck.jsx'
import Feedback from './feedback.jsx'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {

    let rows = [];
    for (let i = 0; i < this.props.totalRows; i++) {
      rows.push(<Row />)
    }

    return (
  <div className='board'>
    {rows}
  </div>
    )
  }
}

export default Board;