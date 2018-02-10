import React from 'react';
import Grid from 'material-ui-next/Grid';
import Paper from 'material-ui-next/Paper';
import { LinearProgress } from 'material-ui-next/Progress';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';

import TimerControls from './timerControls';

import { GREY2 } from '../constants';
import formatTime from '../utils/formatTime';

const styles = theme => ({
  clock_display: {
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
  }
});

class Clock extends React.Component {
  startClock = () => {
    const { done, updateWorkout } = this.props;

    this.props.toggleClock(true);
    this.interval = setInterval(() => {
      updateWorkout();

      if (done) {
        this.pauseClock();
      }
    }, 1000);
  };

  pauseClock = () => {
    this.props.toggleClock(false);

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.running && !this.props.running && !this.interval) {
      // if clock was paused before opening sidebar, restart clock
      this.startClock();
    }
  }

  render() {
    const {
      classes,
      currentInterval,
      done,
      targetIntervals,
      currentTime,
      remainingSets,
      remainingTime,
      resting,
      running,
      progress
    } = this.props;

    let statusMessage = '----';
    if (done) {
      statusMessage = 'DONE';
    } else {
      if (progress) {
        if (!running) {
          statusMessage = 'PAUSED';
        } else {
          statusMessage = resting ? 'REST' : 'WORK';
        }
      } else {
        statusMessage = 'START!';
      }
    }

    return (
      <Grid
        container
        className={classes.container}
        justify="center"
        spacing={16}
      >
        <Paper className={classes.clock}>
          <LinearProgress mode="determinate" value={progress} />
          <div style={{ fontSize: '6rem' }}>{statusMessage}</div>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <Typography type="display1" color="inherit">
                Interval {currentInterval} of {targetIntervals}
              </Typography>
              <div className={classes.clock_display}>
                {formatTime(currentTime)}
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
            running={running}
            onReset={this.resetClock}
            onToggle={running ? this.pauseClock : this.startClock}
          />
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Clock);
