import React from "react";

const Timer = ({updateScore}) => {
  let [timer, setTimer] = React.useState(60);

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
      <div>Timer: {timer} sec</div>
    </div>
  );
}

export default Timer;