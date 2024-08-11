import { useWorkoutStore } from "@/app/reducers/useWorkoutReducer";
import { Workout } from "@/types";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "./Modal";
import Navbar from "./Navbar";

const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);

  const { availableWorkouts, chosenWorkout, chooseWorkout } = useWorkoutStore();

  const toggleShowSettings = () => setShowSettings((prev) => !prev);

  const onClickSettings = () => {
    toggleShowSettings();
  };

  const onChooseWorkout = (workout: Workout) => {
    chooseWorkout(workout);
    toggleShowSettings();
  };

  return (
    <div className="fixed top-0 min-w-[300px] flex items-center justify-center">
      {/* Button */}
      <Navbar onClickSettings={onClickSettings} />
      {/* Modal */}
      <Modal isOpen={showSettings} toggleOpen={toggleShowSettings}>
        <div
          className="bg-white p-3 rounded w-[300px] min-h-[300px] flex flex-col gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2>My Workout{availableWorkouts.length > 1 ? "s" : ""}</h2>
          {availableWorkouts.map((workout, index) => {
            const isActive = workout.name === chosenWorkout.name;
            return (
              <div
                className={twMerge(
                  "bg-gray-200 rounded p-2 cursor-pointer",
                  isActive ? "bg-gray-500 text-gray-200" : ""
                )}
                onClick={() => onChooseWorkout(workout)}
                key={index}
              >
                {workout.name} {isActive}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
