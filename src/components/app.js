import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Grid from 'material-ui-next/Grid';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from 'material-ui-next/styles';

import Clock from './clock';
import Navbar from './navbar';
import Sidebar from './sidebar';

import { DEFAULT_APP_STATE, APP_THEME } from '../constants';
import db from '../db';
import sound from '../soundPlayer';

import { calculateTotalWorkoutTime } from '../utils/helpers';

// TODO check, reject for Internet Explorer
class App extends React.Component {
  state = {
    ...DEFAULT_APP_STATE
  };

  componentDidMount() {
    const intitialState = { ...DEFAULT_APP_STATE, loading: false };

    // check for previous saved workout
    this.loadSavedWorkout()
      .then(saveData => {
        if (saveData) {
          Object.assign(intitialState, {
            ...saveData,
            currentTime: saveData.intervalTime,
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
          ...intitialState
        });
      });
  }

  loadSavedWorkout = () => {
    return db.getItem('workout1').then(saveData => {
      return saveData ? JSON.parse(saveData) : null;
    });
  };

  handleDrawerOpen = () => {
    this.setState(state => ({
      open: true,
      running: false
    }));
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
      running: Boolean(this.state.totalTime)
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
      targetSets,
      targetIntervals,

      setRestTime,
      warmupTime
    };

    // save the workout to storage
    return db.setItem(
      `workout${workoutNumber}`,
      JSON.stringify(workoutSettings)
    );
  };

  updateSettings = newSettings => {
    // TODO : if warmup Time is 0 set app state to start from interval directly
    this.setState({
      currentTime: newSettings.warmupTime,
      // currentTime: newSettings.intervalTime,
      open: false,
      remainingSets: newSettings.targetSets,
      running: false,
      targetTime: calculateTotalWorkoutTime(newSettings),
      totalTime: 0,
      ...newSettings,

      resting: true,
      currentInterval: 0
    });
  };

  resetWorkout = () => {
    this.setState({
      // currentInterval: 1,
      // currentTime: this.state.intervalTime,
      currentInterval: 0,
      currentTime: this.state.warmupTime,

      done: false,
      remainingSets: this.state.targetSets,
      running: false,
      totalTime: 0,

      resting: true
    });
  };

  playSound = workoutStatus => {
    const { currentTime, resting } = this.state;

    if (workoutStatus === 'FINISH') {
      sound.play('finish');
    } else if (workoutStatus === 'WORK') {
      const nextSecond = currentTime - 1;
      if (nextSecond === 0) {
        sound.play(resting ? 'bell' : 'horn');
      } else {
        sound.play(nextSecond.toString());
      }
    }
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
      targetIntervals,

      setRestTime,
      warmupTime,
      totalTime
    } = this.state;

    // if sidebar is open, timer pauses
    if (open || !running) {
      return 'PAUSE';
    }

    // if (totalTime === 0) {
    //   return 'WARMUP'
    // }

    if (currentTime === 0) {
      if (currentInterval === targetIntervals) {
        return remainingSets > 1 ? 'NEW_SET' : 'FINISH';
      } else {
        return resting ? 'NEW_INTERVAL' : 'REST';
      }
    } else {
      return 'WORK';
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
      totalTime,

      setRestTime,
      warmupTime
    } = this.state;
    const workoutUpdate = {};

    if (done) {
      return this.resetWorkout();
    }

    const workoutStatus = this.workoutStatus();
    switch (workoutStatus) {
      case 'WARMUP':
        workoutUpdate.currentTime = warmupTime;
        // workoutUpdate.currentTime = currentTime - 1;
        // workoutUpdate.totalTime = totalTime + 1;
        workoutUpdate.resting = true;
        break;
      case 'WORK':
        workoutUpdate.currentTime = currentTime - 1;
        workoutUpdate.totalTime = totalTime + 1;
        break;
      case 'REST':
        workoutUpdate.currentTime = restTime;
        workoutUpdate.resting = true;
        break;
      case 'NEW_INTERVAL':
        workoutUpdate.currentTime = intervalTime;
        workoutUpdate.resting = false;
        workoutUpdate.currentInterval = currentInterval + 1;
        break;
      case 'NEW_SET':
        // workoutUpdate.currentTime = intervalTime;
        workoutUpdate.currentTime = setRestTime;
        workoutUpdate.resting = true;

        workoutUpdate.remainingSets = remainingSets - 1;
        workoutUpdate.currentInterval = 0;
        break;
      case 'PAUSE':
        return;
      default:
        // FINISHED
        workoutUpdate.remainingSets = remainingSets - 1;
        workoutUpdate.done = true;
        workoutUpdate.running = false;
    }

    this.playSound(workoutStatus);

    this.setState(workoutUpdate);
  };

  render() {
    const { classes } = this.props;
    const {
      currentInterval,
      currentTime,
      done,
      intervalTime,
      loading,
      open,
      remainingSets,
      resting,
      restTime,
      running,
      targetIntervals,
      targetSets,
      targetTime,
      totalTime,

      setRestTime,
      warmupTime
    } = this.state;

    const settings = {
      intervalTime,
      restTime,
      targetIntervals,
      targetSets,
      setRestTime,
      warmupTime
    };

    const remainingTime = calculateTotalWorkoutTime(this.state) - totalTime;

    const theme = createMuiTheme(APP_THEME);

    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          alignContent="flex-start"
          className={classnames(
            'app',
            classes.global_styles,
            classes.root,
            done ? 'gplay' : 'tinyGrid',
            resting ? 'blue' : 'red',
            !totalTime && 'grey2',
            done && 'yellow'
          )}
          spacing={0}
        >
          <Grid item xs={12}>
            <Navbar
              onMenuClick={
                open ? this.handleDrawerClose : this.handleDrawerOpen
              }
            />
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              LOADING
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Clock
                done={done}
                running={running}
                toggleClock={this.toggleClock}
                resting={resting}
                currentInterval={currentInterval}
                currentTime={currentTime}
                progress={totalTime ? totalTime / targetTime * 100 : 0}
                remainingSets={remainingSets}
                remainingTime={remainingTime}
                targetIntervals={targetIntervals}
                targetSets={targetSets}
                reset={this.resetWorkout}
                updateWorkout={this.updateWorkout}
              />
            </Grid>
          )}
          <Sidebar
            open={open}
            settings={settings}
            handleDrawerClose={this.handleDrawerClose}
            loadWorkout={this.loadSavedWorkout}
            saveWorkout={this.saveWorkout}
            updateSettings={this.updateSettings}
          />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  global_styles: {
    fontFamily: 'quantico, sans-serif',
    height: '100%',
    // width: '100%', // NEED THIS? IS IT MESSING UP GRID??
    boxSizing: 'border-box'
  },
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  header: {
    padding: '1rem'
  }
});

export default withStyles(styles)(App);
