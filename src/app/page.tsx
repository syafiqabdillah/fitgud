"use client";
import { Button } from "@/components/Button";
import FinishConfetti from "@/components/FinishConfetti";
import { SetCard } from "@/components/SetCard";
import Settings from "@/components/Settings";
import { useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useWorkoutStore } from "./reducers/useWorkoutReducer";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeSetIndex, setActiveSetIndex] = useState<number | null>(null);
  const [isStarted, setStarted] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const { availableWorkouts, chosenWorkout, chooseWorkout } = useWorkoutStore();

  const scrollToTopSet = () => {
    ref?.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSelectSet = (index: number | null) => {
    setActiveSetIndex(index);
    if (index === null) {
      setStarted(false);
      scrollToTopSet();
    } else {
      setStarted(true);
      ref?.current?.scrollTo({
        top: index * 35,
        behavior: "smooth",
      });
    }
  };

  const onClickMainButton = () => {
    // not started
    if ((activeSetIndex === null || activeSetIndex === 0) && !isStarted) {
      setStarted(true);
      setFinished(false);
      setActiveSetIndex(0);
      return;
    }
    // last set
    if (
      activeSetIndex !== null &&
      activeSetIndex >= chosenWorkout.sets.length - 1
    ) {
      setFinished(true);
      onSelectSet(null);
      setTimeout(() => {
        setFinished(false);
      }, 10000);
      return;
    }
    // has started
    if (
      isStarted &&
      activeSetIndex !== null &&
      activeSetIndex < chosenWorkout.sets.length - 1
    ) {
      onSelectSet(activeSetIndex + 1);
      return;
    }
  };

  const onClickForceFinish = () => {
    onSelectSet(null);
    setStarted(false);
  };

  const mainButtonText = useMemo(() => {
    if (activeSetIndex === null || !isStarted) return "Start";
    if (activeSetIndex === chosenWorkout.sets.length - 1) return "Finish";
    return "Next";
  }, [activeSetIndex, isStarted]);

  const progressPercentage = useMemo(() => {
    return `${
      ((Number(activeSetIndex) + 1) * 100) / chosenWorkout.sets.length
    }%`;
  }, [activeSetIndex]);

  return (
    <div
      className={twMerge(
        "p-4 py-10 flex flex-col items-center justify-center min-h-screen",
        isStarted ? "bg-gray-900" : ""
      )}
    >
      <div className="flex flex-col gap-2 w-[320px] relative">
        <h1 className="text-xl mb-4">{chosenWorkout.name}</h1>
        <div
          className={twMerge(
            "flex flex-col gap-2 max-h-[45vh] overflow-y-auto scrollbar"
          )}
          ref={ref}
        >
          {chosenWorkout.sets.map((workout, index) => (
            <SetCard
              key={`set-${index}`}
              index={index}
              isActive={activeSetIndex === index && isStarted}
              onClick={() => onSelectSet(index)}
              isStarted={isStarted}
              {...workout}
            />
          ))}
        </div>
        <Button
          className="bg-red-500 rounded uppercase font-bold text-[30pt] text-gray-100 tracking-[6px] min-h-[100px] mt-8"
          onClick={onClickMainButton}
        >
          {mainButtonText}
        </Button>
        {isStarted && activeSetIndex !== chosenWorkout.sets.length - 1 ? (
          <Button className="text-gray-300" onClick={onClickForceFinish}>
            <u>Finish</u>
          </Button>
        ) : null}
        {isStarted ? (
          <div className="w-[20px] h-full absolute bottom-0 -right-8 bg-emerald-50 rounded overflow-hidden flex flex-col justify-end">
            <div
              className="min-w-full bg-emerald-400 transition-all ease-in-out duration-200"
              style={{ height: progressPercentage }}
            />
          </div>
        ) : null}
      </div>
      {isFinished ? <FinishConfetti /> : null}
      {!isStarted ? <Settings /> : null}
    </div>
  );
};

export default Home;
