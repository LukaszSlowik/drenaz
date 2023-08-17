"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type Props = {};

let indexOfExcercise = 0;
const typeOfExcercises = ["PEP 2.0", "PEP 2.5", "Aerobika"];
const series = [1, 2, 3];
const Counter = (props: Props) => {
  const [count, setCount] = React.useState(10);
  const [typeOfExcercise, setTypeOfExcercise] = React.useState<string>(
    typeOfExcercises[indexOfExcercise]
  );
  const [serie, setSerie] = React.useState<number>(series[0]);
  const [endOfSeries, setEndOfSeries] = React.useState(false);
  const [rotate, setRotate] = React.useState(0);

  console.log(typeOfExcercise);
  const [disabled, setDisabled] = React.useState(false);

  const handleCounterClick = () => {
    setRotate(1);
    let newCount = count === 1 ? 10 : count - 1;
    if (count === 1) {
      if (serie === 3 && indexOfExcercise === 2) {
        setEndOfSeries(true);
        return;
      }

      setTypeOfExcercise(typeOfExcercises[indexOfExcercise + 1]);
      if (indexOfExcercise === 2) {
        setSerie((prev) => prev + 1);
        indexOfExcercise = 0;
        setTypeOfExcercise(typeOfExcercises[indexOfExcercise]);
      } else indexOfExcercise++;
    }
    // if (count === 1 && indexOfExcercise === 2 && serie < 3) {
    //   setSerie(serie + 1);
    //   indexOfExcercise = 0;
    //   setTypeOfExcercise(typeOfExcercises[indexOfExcercise]);
    // }

    console.log(count);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
    setCount(newCount);
  };
  return (
    <div className="flex items-center  min-h-screen flex-col w-full bg-slate-100">
      <div className="p-10 text-2xl ">
        <p className="text-4xl text-center">
          <span className="font-semibold ">Seria:</span> <span>{serie}</span>
        </p>
        <p className="text-3xl text-center">
          <span className="font-semibold ">Ćwiczenie:</span> {typeOfExcercise}
        </p>
      </div>
      <div className="flex   flex-1 w-full h-full relative">
        <button
          onClick={handleCounterClick}
          onAnimationEnd={() => setRotate(0)}
          disabled={disabled}
          data-clicked={rotate}
          className={cn(
            "cursor-pointer rounded-[50%] bg-green-500 aspect-square w-2/4 sm:w-72 transform-  absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white text-8xl flex items-center justify-center"
          )}
        >
          {endOfSeries ? (
            <span className="text-4xl text-center">Koniec {`:)`}</span>
          ) : (
            <span
              className={cn()
              // rotate === 1 && "animate-[rotate-360_1s_ease-in-out]"
              }
            >
              {" "}
              {count}
            </span>
          )}
        </button>
      </div>

      {/* <div className="text-4xl pb-20"> czas</div> */}
    </div>
  );
};

export default Counter;
