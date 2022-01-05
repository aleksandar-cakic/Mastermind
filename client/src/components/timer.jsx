import React from "react";

const Timer = ({updateScore}) => {
  let [timer, setTimer] = React.useState(1000);

  React.useEffect(() => {
   timer > 0 && setTimeout(() => setTimer(timer - 1), 25)}, [timer]);

  React.useEffect(() => {
   if (timer === 0) {
     return updateScore('lost')
   }}, [timer])

  return (
    <div className="timer">
      <div>Timer: {timer} sec</div>
    </div>
  );
}

export default Timer;