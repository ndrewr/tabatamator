import React from 'react';
import Grid from 'material-ui-next/Grid';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from 'material-ui-next/styles';

import Clock from './clock';
import Layout from './layout';

import { DEFAULT_WORKOUT, heartBackground, zagBackground } from '../constants';

// TODO service worker??
// TODO check, reject for Internet Explorer
const theme = createMuiTheme({
  typography: {
    fontFamily: 'quantico, sans-serif'
    // '-apple-system,system-ui,BlinkMacSystemFont,' +
    // '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    // fontWeightMedium,
    // body1: {
    //   fontWeight: fontWeightMedium,
    // },
    // button: {
    //   fontStyle: 'italic',
    // },
  }
});

const styles = theme => ({
  global_styles: {
    // fontFamily: 'sans-serif',
    fontFamily: 'quantico',
    height: '100%'
  },
  zag_bg: zagBackground,
  heart_bg: heartBackground
});

class App extends React.Component {
  // update state to only include mutable values (not one-time presets)
  state = {
    open: false,
    remainingSets: DEFAULT_WORKOUT.targetSets,
    ...DEFAULT_WORKOUT
  };

  handleDrawerOpen = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleDrawerClose = () => {
    console.log('hi');
    this.setState({ open: false });
  };

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

  updateSettings = newSettings => {
    console.log('updating settings!', newSettings);
    this.setState({
      remainingSets: newSettings.targetSets,
      ...newSettings
    });
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
      intervalTime,
      restTime,
      targetIntervals,
      remainingSets,
      targetSets,
      open
    } = this.state;

    const settings = {
      intervalTime,
      restTime,
      targetIntervals,
      targetSets
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div
          className={`${classes.global_styles} ${
            resting ? classes.heart_bg : classes.zag_bg
          }`}
        >
          <Layout
            open={open}
            settings={settings}
            closeDrawer={this.handleDrawerClose}
            openDrawer={this.handleDrawerOpen}
            updateSettings={this.updateSettings}
          >
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
            </Grid>
          </Layout>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
