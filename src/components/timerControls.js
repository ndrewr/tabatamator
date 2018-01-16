import React from 'react';
import Grid from 'material-ui-next/Grid';
import Button from 'material-ui-next/Button';
import Pause from 'material-ui-icons-next/Pause';
import DirectionsRun from 'material-ui-icons-next/DirectionsRun';
import Autorenew from 'material-ui-icons-next/Autorenew';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    fontSize: '3rem',
    padding: '2rem',
    // width: '100%'
    minWidth: '300px'
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

const TimerControls = ({ classes, running, onReset, onToggle }) => {
  return (
    <Grid container item>
      <Grid item xs={6}>
        <Button
          className={classes.button}
          raised
          color="accent"
          onClick={onToggle}
        >
          {running ? 'PAUSE' : 'GO'}
          {running ? (
            <Pause className={classes.icon} />
          ) : (
            <DirectionsRun className={classes.icon} />
          )}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          className={classes.button}
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

export default withStyles(styles)(TimerControls);
