"use client";

import { useMemo } from "react";
import Confetti from "react-confetti";

const FinishConfetti = () => {
  const dimension = useMemo(() => {
    if (window.innerWidth && window.innerHeight)
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    return {
      width: 0,
      height: 0,
    };
  }, [document]);

  return <Confetti width={dimension.width} height={dimension.height} />;
};

export default FinishConfetti;
