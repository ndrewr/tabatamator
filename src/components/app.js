import React from 'react';
import Grid from 'material-ui-next/Grid';
import { withStyles } from 'material-ui-next/styles';

import Clock from './clock';
import Layout from './layout';

const DEFAULT_WORKOUT = {
  intervalTime: 20,
  restTime: 10,
  sets: 1,
  currentInterval: 1,
  remainingSets: 1,
  currentTime: 0,
  totalTime: 0,
  targetIntervals: 3,
  done: false,
  resting: false
};

const styles = theme => ({
  global_styles: {
    // fontFamily: 'sans-serif',
    fontFamily: 'quantico'
  }
});

class App extends React.Component {
  state = DEFAULT_WORKOUT;

  getRemainingTime = () => {
    const {
      intervalTime,
      restTime,
      sets,
      targetIntervals,
      totalTime
    } = this.state;

    const setCompletionTime =
      targetIntervals * intervalTime + (targetIntervals - 1) * restTime;

    return sets * setCompletionTime - totalTime;
  };

  resetWorkout = () => {
    this.setState(DEFAULT_WORKOUT);
  };

  updateWorkout = () => {
    const {
      resting,
      currentInterval,
      currentTime,
      intervalTime,
      restTime,
      targetIntervals,
      remainingSets,
      totalTime
    } = this.state;

    const workoutUpdate = {
      done: false
    };

    if (currentTime === (resting ? restTime : intervalTime)) {
      // update interval count, reset currentTime
      workoutUpdate.currentTime = 0;

      if (currentInterval === targetIntervals) {
        if (remainingSets > 1) {
          workoutUpdate.remainingSets = remainingSets - 1;
        } else {
          // we are DONE! Display congrats to User
          workoutUpdate.done = true;
        }
      } else {
        if (resting) {
          workoutUpdate.resting = false;
          workoutUpdate.currentInterval = currentInterval + 1;
        } else {
          workoutUpdate.resting = true;
        }
      }
    } else {
      workoutUpdate.currentTime = currentTime + 1;
      workoutUpdate.totalTime = totalTime + 1;
    }

    this.setState(workoutUpdate);
  };

  render() {
    const { classes } = this.props;
    const {
      currentInterval,
      currentTime,
      done,
      resting,
      targetIntervals
    } = this.state;
    return (
      <div className={classes.global_styles}>
        <Layout>
          <Grid item xs={12}>
            <h2>
              Interval {currentInterval} of {targetIntervals}
            </h2>
            <Clock
              done={done}
              resting={resting}
              elapsedTime={currentTime}
              remainingTime={this.getRemainingTime()}
              reset={this.resetWorkout}
              updateWorkout={this.updateWorkout}
            />
            {done && <h1 style={{ fontSize: '5rem' }}>DONE</h1>}
          </Grid>
        </Layout>
      </div>
    );
  }
}

// const StyledApp = withStyles(styles)(App);

export default withStyles(styles)(App);
