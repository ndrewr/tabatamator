import React from "react";

import { WorkoutDataContext } from "../../contexts/WorkoutDataContext";

import Sidebar from "./Sidebar";

export default props => {
  return (
    <WorkoutDataContext.Consumer>
      {({
        // open,
        intervalTime,
        restTime,
        loadSavedWorkout,
        targetIntervals,
        targetSets,
        saveWorkout,
        setRestTime,
        warmupTime,
        updateSettings
      }) => (
        <Sidebar
          // open={open}
          settings={{
            intervalTime,
            restTime,
            targetIntervals,
            targetSets,
            setRestTime,
            warmupTime
          }}
          {...props}
          // handleDrawerClose={this.handleDrawerClose}
          loadWorkout={loadSavedWorkout}
          saveWorkout={saveWorkout}
          updateSettings={updateSettings}
        />
      )}
    </WorkoutDataContext.Consumer>
  );
};
