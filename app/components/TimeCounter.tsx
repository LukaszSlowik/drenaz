import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";

type Props = {
  timerDuration: number;
  onTimerZero: Dispatch<SetStateAction<boolean>>;
};

function TimeCounter({ timerDuration, onTimerZero }: Props) {
  //const [remainingTime, setRemainingTime] = useState(timerDuration);
  const [mounted, setMounted] = useState(false);
  const [remainingTime, setRemainingTime] = React.useState(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("remainingTime") !== null &&
      localStorage.getItem("remainingTime") !== "end"
    ) {
      return Number(localStorage.getItem("remainingTime"));
    }
    return timerDuration;
  });

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       console.log("remainingTime:", remainingTime);
  //       localStorage.setItem("remainingTime", String(remainingTime));
  //     }, 10000); // Interval of 1 minute

  //     // Clear the interval when the component unmounts
  //     return () => clearInterval(interval);
  //   }, [remainingTime]);

  useEffect(() => {
    let timer: any;

    let prevTime = remainingTime;
    const newTime = Math.max(prevTime - 1000, 0);
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 1000, 0));
        localStorage.setItem("remainingTime", newTime.toString());

        // if (Math.max(prevTime - 1000, 0) < 5000 && localTime !== "end") {
        //   localStorage.setItem("remainingTime", "end");
        // }
        if (Math.max(prevTime - 1000, 0) === 0) {
          //onTimerZero(true);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime, onTimerZero]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-10 right-5 z-40">
      <p className="font-semibold">Pozostały czas:</p>
      <span>{formatTime(remainingTime)}</span>
    </div>
  );
}

export default TimeCounter;
