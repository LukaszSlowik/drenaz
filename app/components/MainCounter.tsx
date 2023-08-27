"use client";
import React from "react";
import Counter from "./Counter";
import TimeCounter from "./TimeCounter";
import ModalResetCount from "./modals/ModalResetCount";
import { RotateCcw } from "lucide-react";

type Props = {};
const NUMBEROFREPETITION = 10;
// const repetitions = Array.from(Array(NUMBEROFREPETITION + 1).keys()).slice(1);
const TIMER_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
// const DISABLED_TIME = 2000;

const MainCounter = (props: Props) => {
  const [timerZero, setTimerZero] = React.useState(false);
  const [reset, setReset] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center  min-h-screen flex-col w-full bg-slate-30 relative">
      <Counter key={`Counter${Date.now()}-${reset}`} timerZero={timerZero} />

      <TimeCounter
        key={`TimeCounter${Date.now()}-${reset}`}
        onTimerZero={setTimerZero}
        timerDuration={TIMER_DURATION}
      />
      <ModalResetCount
        open={open}
        onReset={() => {
          setOpen(false);
          setReset(reset + 1);
          localStorage.clear();
          setTimerZero(false);
        }}
        onClose={() => setOpen(false)}
      >
        <p> Czy chcesz zacząć od nowa ?</p>
      </ModalResetCount>
      <div className="fixed bottom-10 left-5 z-40">
        <p
          onClick={() => {
            setOpen(true);
          }}
        >
          <RotateCcw className="w-8 h-8" />
        </p>
      </div>
    </div>
  );
};

export default MainCounter;
