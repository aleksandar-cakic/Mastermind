import React from "react";

const Timer = ({ updateScore, currentDiff, gameOver }) => {
  let time = currentDiff === 'Normal' ? 60 : currentDiff === 'Hard' ? 30 : currentDiff === 'Unfair' ? 10 : 90
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
      {gameOver === true ? null :
      <div>Timer: {timer} sec</div>
    }
    </div>
  );
}

export default Timer;