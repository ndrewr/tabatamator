import React from 'react';
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
const theme = createMuiTheme(APP_THEME);

const styles = theme => ({
  global_styles: {
    fontFamily: 'quantico, sans-serif',
    height: '100%'
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
            remainingSets: saveData.targetSets,

            currentTime: saveData.intervalTime
          });
        }
      })
      .catch(err => {
        // TODO handle error state
        console.log('Error loading data...', err);
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
    this.setState(state => ({ open: !state.open }));
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // currently only supports one saved workout
  saveWorkout = (workoutNumber = 1) => {
    // fun way to one-line the below assignment
    // const workoutSettings = (({ intervalTime, restTime, targetIntervals, targetSets }) => ({ intervalTime, restTime, targetIntervals, targetSets }))(this.state)
    const { intervalTime, restTime, targetIntervals, targetSets } = this.state;
    const workoutSettings = {
      intervalTime,
      restTime,
      targetSets,
      targetIntervals
    };

    // save the workout to storage
    return db.setItem(
      `workout${workoutNumber}`,
      JSON.stringify(workoutSettings)
    );
  };

  updateSettings = newSettings => {
    this.setState({
      remainingSets: newSettings.targetSets,
      // currentTime: 0,
      currentTime: newSettings.intervalTime,
      totalTime: 0,
      targetTime: calculateTotalWorkoutTime(newSettings),
      ...newSettings
    });
  };

  resetWorkout = () => {
    this.setState({
      currentInterval: 1,
      // currentTime: 0,
      currentTime: this.state.intervalTime,
      done: false,
      remainingSets: this.state.targetSets,
      totalTime: 0
    });
  };

  playSound = () => {
    const { currentTime, intervalTime, restTime } = this.state;
    const status = this.workoutStatus();

    if ('FINISH') {
      sound.play('finish');
    } else if ('WORK') {
    }
  };

  workoutStatus = () => {
    const {
      open,
      resting,
      currentInterval,
      currentTime,
      intervalTime,
      restTime,
      targetIntervals,
      remainingSets
    } = this.state;
    const targetTime = resting ? restTime : intervalTime;

    // if sidebar is open, timer pauses
    if (open) {
      return 'PAUSE';
    }

    // if (currentTime === targetTime) {
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
      totalTime
    } = this.state;
    const workoutUpdate = {};

    if (done) {
      workoutUpdate.done = false;
    }

    switch (this.workoutStatus()) {
      case 'WORK':
        // workoutUpdate.currentTime = currentTime + 1;
        workoutUpdate.currentTime = currentTime - 1;

        workoutUpdate.totalTime = totalTime + 1;
        break;
      case 'REST':
        // workoutUpdate.currentTime = 0;
        workoutUpdate.currentTime = restTime;

        workoutUpdate.resting = true;
        break;
      case 'NEW_INTERVAL':
        // workoutUpdate.currentTime = 0;
        workoutUpdate.currentTime = intervalTime;

        workoutUpdate.resting = false;
        workoutUpdate.currentInterval = currentInterval + 1;
        break;
      case 'NEW_SET':
        // workoutUpdate.currentTime = 0;
        workoutUpdate.currentTime = intervalTime;

        workoutUpdate.remainingSets = remainingSets - 1;
        workoutUpdate.currentInterval = 1;
        break;
      case 'PAUSE':
        return;
      default:
        // FINISHED
        workoutUpdate.remainingSets = remainingSets - 1;
        workoutUpdate.done = true;
      // sound.play('finish');
    }

    this.setState(workoutUpdate);
  };

  render() {
    const { classes } = this.props;
    const {
      currentInterval,
      currentTime,
      done,
      loading,
      open,
      resting,
      intervalTime,
      restTime,
      targetIntervals,
      remainingSets,
      targetSets,
      totalTime,
      targetTime
    } = this.state;

    const settings = {
      intervalTime,
      restTime,
      targetIntervals,
      targetSets
    };

    const remainingTime = calculateTotalWorkoutTime(this.state) - totalTime;

    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          alignContent="flex-start"
          className={classnames(
            'app',
            classes.global_styles,
            classes.root,
            // 'subtleGrey',
            done ? 'gplay' : 'tinyGrid',
            resting ? 'blue' : 'red',
            !totalTime && 'grey2',
            done && 'yellow'
          )}
        >
          <Grid item xs={12}>
            <Navbar onMenuClick={this.handleDrawerOpen} />
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              LOADING
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Clock
                done={done}
                pause={open}
                resting={resting}
                currentInterval={currentInterval}
                elapsedTime={currentTime}
                progress={totalTime ? totalTime / targetTime * 100 : 0}
                remainingSets={remainingSets}
                remainingTime={remainingTime}
                targetIntervals={targetIntervals}
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

export default withStyles(styles)(App);
