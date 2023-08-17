"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import ModalResetCount from "./modals/ModalResetCount";
import { RotateCcw } from "lucide-react";
import MyTimer from "./MyTimer";
type Props = {};

let initialDate = new Date();
initialDate.setSeconds(initialDate.getSeconds() + 12000);
let indexOfExcercise = 0;
const typeOfExcercises = ["PEP 2.0", "PEP 2.5", "Aerobika"];
const series = [1, 2, 3];
const Counter = (props: Props) => {
  const [mounted, setMounted] = useState(false);

  //const [count, setCount] = React.useState(3);
  const [count, setCount] = useLocalStorage("count", 10);

  const [typeOfExcercise, setTypeOfExcercise] = React.useState<string>(
    typeOfExcercises[indexOfExcercise]
  );
  const [serie, setSerie] = useLocalStorage("serie", series[0]);
  const [endOfSeries, setEndOfSeries] = useLocalStorage("endOfSeries", false);
  const [reset, setReset] = useState(false);
  const [timer, setTimer] = useLocalStorage("timer", initialDate);
  const [open, setOpen] = useState(false);
  console.log("End of series", endOfSeries);
  //   const [rotate, setRotate] = React.useState(0);

  if (serie === 3 && indexOfExcercise === 2 && count === 0) {
    setCount(10);
    setTypeOfExcercise(typeOfExcercises[0]);
    setSerie(1);
  }

  console.log(typeOfExcercise);
  const [disabled, setDisabled] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (endOfSeries === true || reset === true) {
      setCount(10);
      setTypeOfExcercise(typeOfExcercises[0]);
      setSerie(1);
      setEndOfSeries(false);
      setReset(false);
      setTimer(() => {
        let time = new Date();
        time.setSeconds(time.getSeconds() + 12000);
        return time;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  if (!mounted) return null;

  const handleCounterClick = () => {
    //setRotate(1);
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

    console.log(count);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
    setCount(newCount);
  };
  return (
    <div className="flex items-center  min-h-screen flex-col w-full bg-slate-30 relative ">
      <ModalResetCount
        open={open}
        onReset={() => {
          setOpen(false);
          setReset(true);
        }}
        onClose={() => setOpen(false)}
      >
        <p> Czy chcesz zacząć od nowa ?</p>
      </ModalResetCount>
      <div className="fixed bottom-10 left-5 z-40">
        <p
          onClick={() => {
            setOpen(true);
            console.log("reset");
          }}
        >
          <RotateCcw className="w-8 h-8" />
        </p>
      </div>
      <div className="fixed bottom-10 right-5 z-40">
        <MyTimer
          //key={String(reset)}
          expiryTimestamp={timer}
          pauseFromParent={endOfSeries}
        />
      </div>

      <div className="p-3 text-2xl ">
        <p className="text-4xl text-center">
          <span className="font-semibold ">Seria:</span> <span>{serie}</span>
        </p>
        <p className="text-3xl text-center">{typeOfExcercise}</p>
      </div>
      <div className="flex   flex-1 w-full h-full relative">
        <button
          onClick={handleCounterClick}
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
            <span
              className={
                cn()
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
