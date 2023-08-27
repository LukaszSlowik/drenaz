import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  timerDuration: number;
  onTimerZero: Dispatch<SetStateAction<boolean>>;
};

function TimeCounter({ timerDuration, onTimerZero }: Props) {
  const [remainingTime, setRemainingTime] = useState(timerDuration);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    let timer: any;
    let prevTime = remainingTime;
    const newTime = Math.max(prevTime - 1000, 0);
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(newTime);
        if (Math.max(prevTime - 1000, 0) === 0) {
          onTimerZero(true);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [remainingTime, onTimerZero]);

  return (
    <div className="fixed bottom-10 right-5 z-40">
      <p className="font-semibold">Pozostały czas:</p>
      <span>{formatTime(remainingTime)}</span>
    </div>
  );
}

export default TimeCounter;
