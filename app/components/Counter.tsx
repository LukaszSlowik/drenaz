"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import ModalResetCount from "./modals/ModalResetCount";
import { NutOffIcon, RotateCcw } from "lucide-react";
import MyTimer from "./MyTimer";

const NUMBEROFREPETITION = 10;
const repetitions = Array.from(Array(NUMBEROFREPETITION + 1).keys()).slice(1);
const TIMER_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
//console.log(repetitions);

type Props = {};

// let initialDate = new Date();
// initialDate.setSeconds(initialDate.getSeconds() + 12000);
//let indexOfExcercise = 0;
const typeOfExercises = ["PEP 2.0", "PEP 2.5", "Aerobika"];
const seriesList = [1, 2, 3];
const Counter = (props: Props) => {
  const [mounted, setMounted] = useState(false);

  const [count, setCount] = React.useState(0);
  const [countdown, setCountdown] = React.useState(NUMBEROFREPETITION);
  const [exerciseIndex, setExerciseIndex] = React.useState(0);
  const [endOfSeries, setEndOfSeries] = useState(false);
  const [disabled, setDisabled] = React.useState(false);
  // const [reset, setReset] = useState(false);
  const [serie, setSerie] = React.useState(1);
  const [remainingTime, setRemainingTime] = useState(TIMER_DURATION);

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, []);

  //console.log(count);
  //console.log("index:", exerciseIndex);
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
      //console.log("serie === 3 && exerciseIndex === 2 && countdown === 1");
    } else if (countdown === 1 && exerciseIndex === 2) {
      //console.log("countdown === 1 && exerciseIndex === 2");
      // Reset serie to 1 after each cycle
      setSerie((prev) => prev + 1);
    }
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  const resetStates = () => {
    setCount(0);
    setCountdown(NUMBEROFREPETITION);
    setExerciseIndex(0);
    setEndOfSeries(false);
    setSerie(1);
    setRemainingTime(TIMER_DURATION);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //const [timer, setTimer] = useState(initialDate);
  const [open, setOpen] = useState(false);
  console.log("End of series", endOfSeries);
  //   const [rotate, setRotate] = React.useState(0);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // useEffect(() => {
  //   //only after first render
  //   if (serie === 3 && indexOfExcercise === 2 && count === 0) {
  //     setCount(10);
  //     setTypeOfExcercise(typeOfExcercises[0]);
  //     setSerie(1);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   console.log("reset", endOfSeries);
  //   if (endOfSeries === true || reset === true) {
  //     setCount(10);
  //     setTypeOfExcercise(typeOfExcercises[0]);
  //     setSerie(1);
  //     setEndOfSeries(false);
  //     setReset(false);
  //     setTimer(() => {
  //       let time = new Date();
  //       time.setSeconds(time.getSeconds() + 12000);
  //       return time;
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [reset]);

  // if (!mounted) return null;

  // const handleCounterClick = () => {
  //   //setRotate(1);
  //   console.log("indexOfExcercise", indexOfExcercise);
  //   let newCount = count === 1 ? 10 : count - 1;
  //   if (count === 1) {
  //     if (serie === 3 && typeOfExcercise === "Aerobika") {
  //       setEndOfSeries(true);
  //       return;
  //     } else {
  //       //setSerie((prev) => prev + 1);
  //     }

  //     setTypeOfExcercise(typeOfExcercises[indexOfExcercise + 1]);
  //     if (indexOfExcercise === 2) {
  //       setSerie((prev) => prev + 1);
  //       indexOfExcercise = 0;
  //       setTypeOfExcercise(typeOfExcercises[indexOfExcercise]);
  //     } else indexOfExcercise++;
  //   }

  //   console.log(count);
  //   setDisabled(true);
  //   setTimeout(() => {
  //     setDisabled(false);
  //   }, 3000);
  //   setCount(newCount);
  // };
  return (
    <div className="flex items-center  min-h-screen flex-col w-full bg-slate-30 relative ">
      <ModalResetCount
        open={open}
        onReset={() => {
          setOpen(false);
          resetStates();
        }}
        onClose={() => setOpen(false)}
      >
        <p> Czy chcesz zacząć od nowa ?</p>
      </ModalResetCount>
      <div className="fixed bottom-10 left-5 z-40">
        <p
          onClick={() => {
            setOpen(true);
            //console.log("reset");
          }}
        >
          <RotateCcw className="w-8 h-8" />
        </p>
      </div>
      <div className="fixed bottom-10 right-5 z-40">
        <p>Pozostały czas:</p>
        <span>{formatTime(remainingTime)}</span>
      </div>

      <div className="p-3 text-2xl ">
        <p className="text-4xl text-center">
          <span className="font-semibold ">Seria:</span> <span>{serie}</span>
        </p>
        <p className="text-3xl text-center">{typeOfExercises[exerciseIndex]}</p>
      </div>
      <div className="flex   flex-1 w-full h-full relative">
        <button
          onClick={onClickCounter}
          //onAnimationEnd={() => setRotate(0)}
          disabled={disabled}
          //data-clicked={rotate}
          className={cn(
            "cursor-pointer rounded-[50%] bg-green-500 aspect-square w-2/4 max-w-[200px]    absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white text-8xl flex items-center justify-center"
          )}
        >
          {endOfSeries ? (
            <span className="text-4xl text-center">Koniec {`:)`}</span>
          ) : (
            <span className={cn()}>{countdown}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Counter;
