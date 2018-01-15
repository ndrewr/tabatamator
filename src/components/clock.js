import React from 'react';
import Grid from 'material-ui-next/Grid';
import Paper from 'material-ui-next/Paper';
// import Delete from 'material-ui-icons-next/Delete';
// import Done from 'material-ui-icons-next/Done';
import { withStyles } from 'material-ui-next/styles';

import formatTime from '../utils/formatTime';

import TimerControls from './timerControls';

const styles = theme => ({
  clock: {
    // fontFamily: 'sans-serif',
    padding: '4rem',
    fontSize: '6rem'
  },
  container: {
    padding: '1rem'
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
    const { classes, elapsedTime, remainingTime, resting } = this.props;
    const { running } = this.state;

    return (
      <Grid
        container
        className={classes.container}
        justify="center"
        spacing={16}
      >
        <Paper className={classes.container}>
          <h2>{resting ? 'REST' : 'WORK'}</h2>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.clock}>{formatTime(elapsedTime)}</div>
            </Grid>
            <Grid item xs={6}>
              <h3>Remaining Time</h3>
              <h2>{formatTime(remainingTime)}</h2>
              <h3>Remaining Tabatas</h3>
              <h2>0</h2>
            </Grid>
          </Grid>
          <TimerControls
            running={running}
            onReset={this.resetClock}
            onToggle={this.toggleClock}
          />
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Clock);
