import React from 'react';
import Grid from 'material-ui-next/Grid';
import { withStyles } from 'material-ui-next/styles';

import Clock from './clock';
import Layout from './layout';

const DEFAULT_WORKOUT = {
  intervalTime: 20,
  restTime: 10,
  targetSets: 2,
  currentInterval: 1,
  remainingSets: 2,
  currentTime: 0,
  totalTime: 0,
  targetIntervals: 3,
  done: false,
  resting: false
};

const heartBackground = {
  background: `
  radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%),
  radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%),
  radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%),
  radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%),
  radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%),

  radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,
  radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,
  radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,
  radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,
  radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%) 50px 50px`,
  backgroundColor: '#b03',
  backgroundSize: '100px 100px'
};

const zagBackground = {
  background: `
    linear-gradient(135deg, #ECEDDC 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, #ECEDDC 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, #ECEDDC 25%, transparent 25%),
    linear-gradient(45deg, #ECEDDC 25%, transparent 25%)`,
  backgroundSize: '100px 100px',
  backgroundColor: '#EC173A'
};

const styles = theme => ({
  global_styles: {
    // fontFamily: 'sans-serif',
    fontFamily: 'quantico'
  }
});

class App extends React.Component {
  // update state to only include mutable values (not one-time presets)
  state = DEFAULT_WORKOUT;

  getRemainingTime = () => {
    const {
      intervalTime,
      restTime,
      targetSets,
      targetIntervals,
      totalTime
    } = this.state;

    const setCompletionTime =
      targetIntervals * intervalTime + (targetIntervals - 1) * restTime;

    return targetSets * setCompletionTime - totalTime;
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
          workoutUpdate.currentInterval = 1;
          // resting between sets?
        } else {
          // we are DONE! Display congrats to User
          workoutUpdate.done = true;
        }

        workoutUpdate.remainingSets = remainingSets - 1;
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
      targetIntervals,
      targetSets,
      remainingSets
    } = this.state;
    return (
      <div
        className={classes.global_styles}
        style={resting ? heartBackground : zagBackground}
      >
        <Layout>
          <Grid item xs={12}>
            <Clock
              done={done}
              resting={resting}
              elapsedTime={currentTime}
              remainingTime={this.getRemainingTime()}
              reset={this.resetWorkout}
              updateWorkout={this.updateWorkout}
              remainingSets={remainingSets}
              currentInterval={currentInterval}
              targetIntervals={targetIntervals}
            />
            {done && <h1 style={{ fontSize: '5rem' }}>DONE</h1>}
          </Grid>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(App);
