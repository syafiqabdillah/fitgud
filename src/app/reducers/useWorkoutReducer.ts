import { CHEST_WORKOUT, SHOULDER_DAY } from "@/mocks/workouts";
import { Workout } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  availableWorkouts: Workout[];
  chosenWorkout: Workout;
};

const initialState: State = {
  availableWorkouts: [CHEST_WORKOUT, SHOULDER_DAY],
  chosenWorkout: CHEST_WORKOUT,
};

type WorkoutStore = State & {
  chooseWorkout: (workout: Workout) => void;
  addWorkout: (workout: Workout) => void;
};

export const useWorkoutStore = create<WorkoutStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        chooseWorkout: (workout: Workout) =>
          set((state) => ({ ...state, chosenWorkout: workout })),
        addWorkout: (workout: Workout) => {
          const workoutNames = initialState.availableWorkouts.map(
            (w) => w.name
          );
          if (workout.name === "" || workoutNames.includes(workout.name)) {
            alert("Cannot add workout with empty name or duplicate name");
            return;
          }

          set((state) => ({
            ...state,
            availableWorkouts: [...state.availableWorkouts, workout],
          }));
        },
      }),
      {
        name: "workoutStore",
      }
    )
  )
);
