import React from "react";
import Clock from "./Clock";

import { WorkoutDataContext } from "../../contexts/WorkoutDataContext";

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
        // progress={ totalTime?(totalTime / targetTime) * 100 : 0}
        remainingSets,
        remainingTime,
        targetIntervals,
        targetSets,
        totalTime,
        targetTime,
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
          remainingTime={remainingTime}
          targetIntervals={targetIntervals}
          targetSets={targetSets}
          reset={reset}
          updateWorkout={updateWorkout}
        />
      )}
    </WorkoutDataContext.Consumer>
  );
};
