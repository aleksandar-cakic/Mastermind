import React from "react";

const Timer = ({updateScore}) => {
  let [timer, setTimer] = React.useState(1000);

  React.useEffect(() => {
   timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
   return () => {
    clearTimeout(timer);
  }
}, [timer]);

  React.useEffect(() => {
   if (timer === 0) {
     // maybe start a new game or block further moves
     return updateScore('lost')
   }}, [])

  return (
    <div className="timer">
      <div>Timer: {timer} sec</div>
    </div>
  );
}

export default Timer;