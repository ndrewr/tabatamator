import React from "react";

import { DEFAULT_APP_STATE, APP_THEME } from "../constants";
import db from "../db";

import { calculateTotalWorkoutTime } from "../utils/helpers";

export const WorkoutDataContext = React.createContext();

export class WorkoutDataProvider extends React.Component {
  state = {
    ...DEFAULT_APP_STATE
  };

  componentDidMount() {
    const initialState = { ...DEFAULT_APP_STATE, loading: false };

    db.checkStatus();

    // check for previous saved workout
    this.loadSavedWorkout()
      .then(saveData => {
        if (saveData) {
          Object.assign(initialState, {
            ...saveData,
            currentTime: saveData.warmupTime || saveData.intervalTime,
            remainingSets: saveData.targetSets
          });
        }
      })
      .catch(err => {
        // TODO handle error state
        // console.log('Error loading data...', err);
      })
      .finally(() => {
        this.setState({
          ...initialState
        });
      });
  }

  loadSavedWorkout = () => {
    return db.getItem("workout1").then(saveData => {
      return saveData ? JSON.parse(saveData) : null;
    });
  };

  // currently only supports one saved workout
  saveWorkout = (workoutNumber = 1) => {
    // fun way to one-line the below assignment
    // const workoutSettings = (({ intervalTime, restTime, targetIntervals, targetSets }) => ({ intervalTime, restTime, targetIntervals, targetSets }))(this.state)
    const {
      intervalTime,
      restTime,
      targetIntervals,
      targetSets,
      setRestTime,
      warmupTime
    } = this.state;
    const workoutSettings = {
      intervalTime,
      restTime,
      setRestTime,
      targetSets,
      targetIntervals,
      warmupTime
    };

    console.log("saving workout with...", workoutSettings);

    // save the workout to storage
    return db.setItem(
      `workout${workoutNumber}`,
      JSON.stringify(workoutSettings)
    );
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

  toggleClock = run => {
    this.setState({ running: run });
  };

  workoutStatus = () => {
    const {
      currentInterval,
      currentTime,
      open,
      running,
      remainingSets,
      resting,
      targetIntervals
    } = this.state;

    // if sidebar is open, timer pauses
    if (open || !running) {
      return "PAUSE";
    }

    if (currentTime === 0) {
      if (currentInterval === targetIntervals) {
        return remainingSets > 1 ? "NEW_SET" : "FINISH";
      } else {
        return resting ? "NEW_INTERVAL" : "REST";
      }
    } else {
      return "WORK";
    }
  };

  updateWorkout = () => {
    const {
      done,
      currentInterval,
      currentTime,
      intervalTime,
      restTime,
      remainingSets,
      setRestTime,
      totalTime
    } = this.state;
    const workoutUpdate = {};

    if (done) {
      return this.resetWorkout();
    }

    const workoutStatus = this.workoutStatus();
    switch (workoutStatus) {
      case "WORK":
        workoutUpdate.currentTime = currentTime - 1;
        workoutUpdate.totalTime = totalTime + 1;
        break;
      case "REST":
        workoutUpdate.currentTime = restTime;
        workoutUpdate.resting = true;
        break;
      case "NEW_INTERVAL":
        workoutUpdate.currentTime = intervalTime;
        workoutUpdate.resting = false;
        workoutUpdate.currentInterval = currentInterval + 1;
        break;
      case "NEW_SET":
        workoutUpdate.currentTime = setRestTime;
        workoutUpdate.resting = true;
        workoutUpdate.remainingSets = remainingSets - 1;
        workoutUpdate.currentInterval = 0;
        break;
      case "PAUSE":
        return;
      default:
        // FINISHED
        workoutUpdate.remainingSets = remainingSets - 1;
        workoutUpdate.done = true;
        workoutUpdate.running = false;
    }

    // this.playSound(workoutStatus);

    this.setState(workoutUpdate);
  };

  render() {
    return (
      <WorkoutDataContext.Provider
        value={{
          ...this.state,
          loadSavedWorkout: this.loadSavedWorkout,
          reset: this.resetWorkout,
          saveWorkout: this.saveWorkout,
          toggleClock: this.toggleClock,
          updateSettings: this.updateSettings,
          updateWorkout: this.updateWorkout
        }}
      >
        {this.props.children}
      </WorkoutDataContext.Provider>
    );
  }
}

// helper to inject context into Class components with the special prop "context"
export function withWorkoutDataContext(Component) {
  return props => (
    <WorkoutDataContext.Consumer>
      {state => <Component {...props} context={state} />}
    </WorkoutDataContext.Consumer>
  );
}
