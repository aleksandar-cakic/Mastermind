import React from "react";
import '../stylesheets/Board.css'

const Timer = ({ updateScore, currentDiff, gameOver }) => {
  let time = currentDiff === 'Normal' ? 60 : currentDiff === 'Hard' ? 30 : currentDiff === 'Unfair' ? 35 : null
  let [timer, setTimer] = React.useState(time)

  React.useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)

    if (timer === 0) {
      return updateScore('lost')
    }

    return () => {
      clearTimeout(timer);
    }
  }, [timer]);

  return (
    <div className="timer">
      {gameOver ? null :
        currentDiff === 'Easy'
          ? null
          : <div>Timer: {timer} sec</div>
      }
    </div>
  );
}

export default Timer;