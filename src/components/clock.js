import React from 'react';
import Grid from 'material-ui-next/Grid';
import Paper from 'material-ui-next/Paper';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';

import formatTime from '../utils/formatTime';

import TimerControls from './timerControls';

import { GREY2 } from '../constants';

const styles = theme => ({
  clock_display: {
    // fontFamily: 'sans-serif',
    // padding: '2rem',
    minWidth: '400px',
    fontSize: '6.5rem'
  },
  clock: {
    padding: '1rem',
    backgroundColor: GREY2
  },
  container: {
    marginTop: '1rem',
    padding: 0
    // padding: '1rem',
    // minWidth:
  }
});

class Clock extends React.Component {
  state = {
    running: false
  };

  toggleClock = () => {
    const { updateWorkout } = this.props;
    const { running } = this.state;

    this.setState(state => ({ running: !state.running }));

    if (running) {
      // this.resetClock()
      this.pauseClock();
      return;
    }

    this.interval = setInterval(() => {
      updateWorkout();

      if (this.props.done) {
        this.pauseClock();
      }
    }, 1000);
  };

  pauseClock = () => {
    this.setState(state => ({ running: false }));

    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  resetClock = () => {
    this.pauseClock();
    this.props.reset();
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const {
      classes,
      currentInterval,
      done,
      pause,
      targetIntervals,
      elapsedTime,
      remainingSets,
      remainingTime,
      resting
    } = this.props;
    const { running } = this.state;

    let statusMessage = '----';
    if (done) {
      statusMessage = 'DONE';
    } else {
      if (elapsedTime) {
        if (pause || !running) {
          statusMessage = 'PAUSED';
        } else {
          statusMessage = resting ? 'REST' : 'WORK';
        }
      }
      // else {
      //   statusMessage = 'START!';
      // }
    }

    return (
      <Grid
        container
        className={classes.container}
        justify="center"
        spacing={16}
      >
        <Paper className={classes.clock}>
          <div style={{ fontSize: '6rem' }}>{statusMessage}</div>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <Typography type="display1" color="inherit">
                Interval {currentInterval} of {targetIntervals}
              </Typography>
              <div className={classes.clock_display}>
                {formatTime(elapsedTime)}
              </div>
            </Grid>
            <Grid container item xs={12} sm={5}>
              <Grid item xs={12}>
                <Typography
                  type="title"
                  color="inherit"
                  style={{ fontWeight: 'bold' }}
                >
                  Remaining
                </Typography>
              </Grid>
              <Grid item xs={6} sm={12}>
                <Typography type="title" color="inherit">
                  Time
                </Typography>
                <Typography type="display2" color="inherit">
                  {formatTime(remainingTime)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={12}>
                <Typography type="title" color="inherit">
                  Tabatas
                </Typography>
                <Typography type="display2" color="inherit">
                  {remainingSets}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <TimerControls
            running={running && !pause}
            onReset={this.resetClock}
            onToggle={this.toggleClock}
          />
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Clock);
