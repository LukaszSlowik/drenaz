"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

//console.log(repetitions);

type Props = {
  children?: React.ReactNode;
  timerZero?: boolean;
};

const NUMBEROFREPETITION = 10;
const DISABLED_TIME = 2000;
const TIMER_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

const typeOfExercises = ["PEP 2.0", "PEP 2.5", "Aerobika"];
const seriesList = [1, 2, 3];
const Counter = ({ children, timerZero }: Props) => {
  const [mounted, setMounted] = useState(false);

  const [count, setCount] = React.useState(0);
  const [countdown, setCountdown] = React.useState(NUMBEROFREPETITION);
  const [exerciseIndex, setExerciseIndex] = React.useState(0);
  const [endOfSeries, setEndOfSeries] = useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const [serie, setSerie] = React.useState(1);

  const onClickCounter = () => {
    const prevCount = count;
    if (
      prevCount ===
      NUMBEROFREPETITION * typeOfExercises.length * seriesList.length - 1
    ) {
      setEndOfSeries(true);
      return;
    }
    setCount(count + 1);
    setCountdown((prev) => {
      let fromZeroTo10 = (prevCount + 1) % NUMBEROFREPETITION;
      fromZeroTo10 = NUMBEROFREPETITION - fromZeroTo10;
      return fromZeroTo10;
    });
    setExerciseIndex((prev) => {
      //let currentIndex = prev;
      const newIndex = Math.floor(
        ((prevCount + 1) % (typeOfExercises.length * NUMBEROFREPETITION)) /
          NUMBEROFREPETITION
      );
      //console.log("newIndex", newIndex);
      return newIndex;
    });

    if (serie === 3 && exerciseIndex === 2 && countdown === 1) {
    } else if (countdown === 1 && exerciseIndex === 2) {
      setSerie((prev) => prev + 1);
    }
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, DISABLED_TIME);
  };

  // const resetStates = () => {
  //   setCount(0);
  //   setCountdown(NUMBEROFREPETITION);
  //   //setExerciseIndex(0);
  //   setEndOfSeries(false);
  //   setSerie(1);
  //   //setRemainingTime(TIMER_DURATION);
  // };

  console.log("End of series", endOfSeries);
  //   const [rotate, setRotate] = React.useState(0);

  return (
    <>
      <div className="p-3 text-2xl ">
        <p className="text-4xl text-center">
          <span className="font-semibold ">Seria:</span> <span>{serie}</span>
        </p>
        <p className="text-3xl text-center">{typeOfExercises[exerciseIndex]}</p>
        {timerZero && <p>czas się skończył</p>}
      </div>
      <div className="flex   flex-1 w-full h-full relative">
        <button
          onClick={onClickCounter}
          disabled={disabled}
          className={cn(
            "cursor-pointer rounded-[50%] bg-green-500 aspect-square w-2/4 max-w-[200px]  dis   absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white text-8xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {endOfSeries ? (
            <span className="text-4xl text-center">Koniec {`:)`}</span>
          ) : (
            <span className={cn()}>{countdown}</span>
          )}
        </button>
      </div>
    </>
  );
};

export default Counter;
