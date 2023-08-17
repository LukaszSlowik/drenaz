import React from "react";
import { useTimer } from "react-timer-hook";

type Props = {
  expiryTimestamp: Date;
  pauseFromParent: boolean;
};

const MyTimer = ({ expiryTimestamp, pauseFromParent }: Props) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  React.useEffect(() => {
    if (pauseFromParent === true) {
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseFromParent]);

  return (
    <div className="w-32 text-lg">
      <div>
        {/* <span>{days}</span>:<span>{hours}</span>: */}
        <p> Pozostało: </p>
        <p className="relative">
          <span className="font-semibold">{minutes}</span>
          <span className="absolute top-0 left-6">minut</span>{" "}
        </p>
        <p className="relative">
          <span className="font-semibold">{seconds}</span>{" "}
          <span className="absolute top-0 left-6">sekund</span>
        </p>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button> */}
      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart 
      </button>*/}
    </div>
  );
};

export default MyTimer;
