import { Workout } from "@/types";

export const CHEST_WORKOUT: Workout = {
  name: "Dumbbell Chest Workout",
  sets: [
    {
      name: "Warm Up",
      duration: 60,
    },
    {
      name: "Chest Press",
      repetitions: 10,
    },
    {
      isRest: true,
      duration: 120,
    },
    {
      name: "Flat Dumbbell Fly",
      repetitions: 10,
    },
    {
      isRest: true,
      duration: 120,
    },
    {
      name: "Incline Dumbbell Press",
      repetitions: 10,
    },
    {
      isRest: true,
      duration: 120,
    },
    {
      name: "Incline Dumbbell Fly",
      repetitions: 10,
    },
    {
      isRest: true,
      duration: 120,
    },
    {
      name: "Single Arm Dumbbell Press",
      repetitions: 10,
    },
    {
      isRest: true,
      duration: 120,
    },
    {
      name: "Dumbbell Pull-Over",
      repetitions: 10,
    },
  ]
};

export const SHOULDER_DAY: Workout = {
  name: "Shoulder Day",
  sets: [
    {
      name: "Warm Up",
      duration: 60,
    },
    {
      name: "Dumbbell Shrug",
      repetitions: 20,
    },
  ]
};
