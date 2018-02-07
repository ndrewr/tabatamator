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
    db
      .getItem('workout1')
      .then(saveData => {
        if (saveData) {
          let parsedData = JSON.parse(saveData);
          Object.assign(intitialState, {
            ...parsedData,
            remainingSets: parsedData.targetSets
          });
        }

        this.setState({
          ...intitialState
        });
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
      currentTime: 0,
      totalTime: 0,
      targetTime: calculateTotalWorkoutTime(newSettings),
      ...newSettings
    });
  };

  resetWorkout = () => {
    this.setState({
      currentTime: 0,
      totalTime: 0,
      remainingSets: this.state.targetSets
    });
  };

  updateWorkout = () => {
    const {
      open,
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

    // if sidebar is open, timer pauses
    if (open) {
      return;
    }

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

      loading,

      intervalTime,
      restTime,
      targetIntervals,
      remainingSets,
      targetSets,
      totalTime,
      open,
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
            // 'gplay',
            // 'subtleGrey',
            'tinyGrid',
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
            saveWorkout={this.saveWorkout}
            updateSettings={this.updateSettings}
          />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
