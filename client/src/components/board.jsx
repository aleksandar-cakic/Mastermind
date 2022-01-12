import React, { useEffect, useState } from 'react';
import '../stylesheets/input.css'
import '../stylesheets/Feedback.css';
import '../stylesheets/Board.css';

const Board = ({ test, data, checkWinCondition, feedbackRow, newGame, isChecked, updateColor, color, one, two, three, four, colorNum, gameOver, remainingGuesses, updateRowCount, restartGame, won, lost, resetState, gameWon, addForm}) => {

  const initialState = '';
  const [pegs, setPegs] = useState(data);
  const [feedback, setFeedback] = useState(feedbackRow);
  const [addFormData, setAddFormData] = useState(addForm)

  const handleAddFormChange = async (event) => {
    await updateColor(event)

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const fieldColor = event.target.id;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = { value: fieldValue, color: fieldColor };

    setAddFormData(newFormData)
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPeg = {
      one: addFormData.one,
      two: addFormData.two,
      three: addFormData.three,
      four: addFormData.four,
      feedback: feedback.length > 4 ? feedback.slice(-4) : feedback,
    };
    console.log('newPeg', newPeg)

    console.log('feedbackBOARD', feedback)
    const newPegs = [...pegs, newPeg];
    setPegs(newPegs);

    const newFeed = {
      one: feedback[0],
      two: feedback[1],
      three: feedback[2],
      four: feedback[3],
    }

    console.log('newPegs', newPegs)
    console.log('newFeed', newFeed)
    const newFeedback = [...feedback, newFeed]
    console.log('newFeedback:', newFeedback)
    setFeedback(newFeedback)

    const currentPegs = Object.values(newPegs[newPegs.length - 1])
    updateRowCount()
    checkWinCondition(currentPegs, newPegs, newFeedback)
    resetState()
    event.target.reset()
  }

  const resetBoard = (event) => {
    console.log('RESET')
    restartGame()
    setPegs(data)
    setFeedback(feedbackRow)
    setAddFormData({
        one: '',
        two: '',
        three: '',
        four: '',
      })
  }

  return (
    <div className='container'>
      {pegs ?
        <table className='tableGuesses'>
          <tbody>
            {pegs.map((peg, i) => (
              <tr key={i}>
                <td className='circle' style={{ backgroundColor: peg.one.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.two.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.three.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.four.color }}></td>
                {peg.feedback.map((feed, i) => (
                  <td key={i} className='feedback' style={{ backgroundColor: feed === 'match' ? 'green' : feed === 'partial' ? 'yellow' : 'white' }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        : null}
      <br></br>
      {gameOver
        ? <div> {(gameWon
          ? <div className='score'>YOU WON!!!</div>
            : <div className='score'>YOU LOST :((</div>
            )} <div className='restartGame' onClick={resetBoard}>Play Again?</div>
            </div>
            : <div className='remainingGuesses'>{`${remainingGuesses} guesses remaining`}</div>}
            <br></br>

            {
              newGame ?
                <form className='inputRow' onSubmit={handleAddFormSubmit}>
                  <input className='circle'
                    type='radio'
                    name='one'
                    required='required'
                    placeholder='one'
                    value={one.num}
                    onClick={handleAddFormChange}
                    id={one.color}
                    style={{ backgroundColor: one.color }}
                  />
                  <input
                    className='circle'
                    type='radio'
                    name='two'
                    required='required'
                    placeholder='two'
                    value={two.num}
                    onClick={handleAddFormChange}
                    id={two.color}
                    style={{ backgroundColor: two.color }}
                  />
                  <input
                    className='circle'
                    type='radio'
                    name='three'
                    required='required'
                    placeholder='three'
                    value={three.num}
                    onClick={handleAddFormChange}
                    id={three.color}
                    style={{ backgroundColor: three.color }}
                  />
                  <input
                    className='circle'
                    type='radio'
                    name='four'
                    required='required'
                    placeholder='four'
                    value={four.num}
                    onClick={handleAddFormChange}
                    id={four.color}
                    style={{ backgroundColor: four.color }}
                  />
                  {gameOver ? null :
                    <button className='rowCheck' type='submit' value='submit' id='submit'>Check</button>
                  }
                </form>
                : ''
            }
          </div >
  )
}

      export default Board;