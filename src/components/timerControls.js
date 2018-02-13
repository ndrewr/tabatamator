import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Grid from 'material-ui-next/Grid';
import Button from 'material-ui-next/Button';
import Pause from 'material-ui-icons-next/Pause';
import DirectionsRun from 'material-ui-icons-next/DirectionsRun';
import Autorenew from 'material-ui-icons-next/Autorenew';
import { withStyles } from 'material-ui-next/styles';

import { BLUE, RED } from '../constants';

const TimerControls = ({ classes, done, running, onReset, onToggle }) => {
  return (
    <Grid className={classes.container} container item>
      <Grid item xs={12} sm={6}>
        <Button
          className={classnames(classes.button, classes.button__red)}
          raised
          color="accent"
          onClick={onToggle}
        >
          {done ? 'AGAIN' : running ? 'PAUSE' : 'GO'}
          {running ? (
            <Pause className={classes.icon} />
          ) : (
            <DirectionsRun className={classes.icon} />
          )}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className={classnames(classes.button, classes.button__yellow)}
          raised
          color="primary"
          onClick={onReset}
        >
          RESET
          <Autorenew className={classes.icon} />
        </Button>
      </Grid>
    </Grid>
  );
};

TimerControls.propTypes = {
  classes: PropTypes.object,
  done: PropTypes.bool,
  running: PropTypes.bool,
  onReset: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

const styles = theme => ({
  container: {
    marginTop: '1rem'
  },
  button: {
    fontSize: '3rem',
    padding: '2rem',
    width: '90%'
  },
  button__red: {
    backgroundColor: RED
  },
  button__yellow: {
    backgroundColor: BLUE
  },
  icon: {
    width: '3rem',
    height: '3rem'
  }
});

export default withStyles(styles)(TimerControls);
