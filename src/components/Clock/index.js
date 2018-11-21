import React from "react";
import Clock from "./Clock";

import { WorkoutDataContext } from "../../contexts/WorkoutDataContext";

import { calculateTotalWorkoutTime } from "../../utils/helpers";

export default props => {
  return (
    <WorkoutDataContext.Consumer>
      {({
        done,
        resting,
        running,
        toggleClock,
        currentInterval,
        currentTime,
        intervalTime,
        remainingSets,
        remainingTime,
        restTime,
        setRestTime,
        targetIntervals,
        targetSets,
        totalTime,
        targetTime,
        warmupTime,
        reset,
        updateWorkout
      }) => (
        <Clock
          done={done}
          running={running}
          toggleClock={toggleClock}
          resting={resting}
          currentInterval={currentInterval}
          currentTime={currentTime}
          progress={totalTime ? (totalTime / targetTime) * 100 : 0}
          remainingSets={remainingSets}
          remainingTime={
            calculateTotalWorkoutTime({
              intervalTime,
              restTime,
              setRestTime,
              targetIntervals,
              targetSets,
              warmupTime
            }) - totalTime
          }
          targetIntervals={targetIntervals}
          targetSets={targetSets}
          reset={reset}
          updateWorkout={updateWorkout}
          {...props}
        />
      )}
    </WorkoutDataContext.Consumer>
  );
};
