"use client";
import { Set } from "@/types";
import { FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = Set & {
  className?: string;
  index: number;
  isStarted?: boolean;
};

export const SetCard: FC<Props> = ({
  name,
  onClick,
  isRest,
  isActive,
  duration,
  repetitions,
  className,
  index,
  isStarted,
}) => {
  const [countDown, setCountDown] = useState(duration);

  const subText = () => {
    if (isActive && duration) {
      return `${countDown}s`;
    }
    return duration ? `${duration}s` : `${repetitions} reps`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && duration) {
      interval = setInterval(() => {
        if (countDown && countDown > 0)
          setCountDown((prev) => {
            if (!prev) return 0;
            return prev - 1;
          });
      }, 1000);
    }

    if (!isActive && duration && countDown !== duration) {
      setCountDown(duration);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div
      className={twMerge(
        "rounded p-4 cursor-pointer bg-gray-300 transition-all duration-300 ease-in-out min-h-[40px] border-none outline-none flex justify-between  gap-2",
        isActive
          ? "min-h-[200px] flex-col bg-red-400 text-gray-200 tracking-widest"
          : "items-center",
        isRest && isActive ? "bg-emerald-600" : "",
        isStarted && !isActive ? "opacity-50" : "",
        className
      )}
      onClick={onClick}
      id={`set-${index}`}
    >
      <div
        className={twMerge(isActive ? "mb-auto text-4xl font-semibold" : "")}
      >
        <div>{isRest ? "Rest" : name}</div>
      </div>
      <div
        className={twMerge(
          "text-xs whitespace-nowrap text-gray-600",
          isActive ? "mt-auto ml-auto font-bold text-5xl text-gray-200" : ""
        )}
      >
        {subText()}
      </div>
    </div>
  );
};
