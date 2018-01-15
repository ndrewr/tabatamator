import React from 'react';
import Grid from 'material-ui-next/Grid';
import Button from 'material-ui-next/Button';
import Paper from 'material-ui-next/Paper';
import Delete from 'material-ui-icons-next/Delete';
import Done from 'material-ui-icons-next/Done';
import Pause from 'material-ui-icons-next/Pause';
import DirectionsRun from 'material-ui-icons-next/DirectionsRun';
import Autorenew from 'material-ui-icons-next/Autorenew';
import { withStyles } from 'material-ui-next/styles';

import formatTime from '../utils/formatTime';

const styles = theme => ({
  clock: {
    // fontFamily: 'sans-serif',
    padding: '4rem',
    fontSize: '6rem'
  },
  button: {
    // margin: theme.spacing.unit,
    fontSize: '3rem',
    padding: '2rem',
    width: '100%'
    // height: '50%',
  },
  icon: {
    width: '3rem',
    height: '3rem'
    // fontSize: '3rem',
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class Clock extends React.Component {
  state = {
    running: false
  };

  toggleClock = () => {
    const { done, updateWorkout } = this.props;
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

  // updateDisplay = () => {

  // }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { classes, elapsedTime, remainingTime, resting } = this.props;
    const { running } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={16}>
        <Grid container>
          <Grid item xs={6}>
            <h2>{resting ? 'REST' : 'WORK'}</h2>
            <div className={classes.clock}>{formatTime(elapsedTime)}</div>
          </Grid>
          <Grid item xs={6}>
            <h3>Remaining Time</h3>
            <h2>{formatTime(remainingTime)}</h2>
            <h3>Remaining Tabatas</h3>
            <h2>0</h2>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={6}>
            <Button
              className={classes.button}
              raised
              color="accent"
              onClick={this.toggleClock}
            >
              {running ? 'PAUSE' : 'GO'}
              {running ? (
                <Pause className={[classes.rightIcon, classes.icon]} />
              ) : (
                <DirectionsRun className={[classes.rightIcon, classes.icon]} />
              )}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className={classes.button}
              raised
              color="primary"
              onClick={this.resetClock}
            >
              RESET
              <Autorenew className={[classes.rightIcon, classes.icon]} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Clock);
