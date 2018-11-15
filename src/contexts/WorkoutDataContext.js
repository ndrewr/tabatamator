import React from "react";

import { DEFAULT_APP_STATE, APP_THEME } from "../constants";

export const WorkoutDataContext = React.createContext();

export class WorkoutDataProvider extends React.Component {
  state = {
    ...DEFAULT_APP_STATE
  };

  updateSettings = newSettings => {
    this.setState({
      currentInterval: 0,
      currentTime: newSettings.warmupTime,
      open: false,
      remainingSets: newSettings.targetSets,
      resting: true,
      running: false,
      targetTime: calculateTotalWorkoutTime(newSettings),
      totalTime: 0,
      ...newSettings
    });
  };

  resetWorkout = () => {
    this.setState({
      currentInterval: 0,
      currentTime: this.state.warmupTime,
      done: false,
      remainingSets: this.state.targetSets,
      resting: true,
      running: false,
      totalTime: 0
    });
  };

  render() {
    return (
      <WorkoutDataContext.Provider
        value={{
          ...this.state,
          resetWorkout: this.resetWorkout,
          updateSettings: this.updateSettings
        }}
      >
        {this.props.children}
      </WorkoutDataContext.Provider>
    );
  }
}
