import React from "react";
import PropTypes from "prop-types";

import Grid from "material-ui-next/Grid";
import Paper from "material-ui-next/Paper";
import { LinearProgress } from "material-ui-next/Progress";
import Typography from "material-ui-next/Typography";
import { withStyles } from "material-ui-next/styles";

import TimerControls from "../timerControls";

import formatTime from "../../utils/formatTime";
import isMobile from "../../utils/isMobile";

class Clock extends React.Component {
  startClock = () => {
    const { done, updateWorkout } = this.props;

    this.props.toggleClock(true);

    this.interval = setInterval(() => {
      updateWorkout();
      // check *current* value of "running" prop
      if (done || !this.props.running) {
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
      // special case: prior pause cleared interval so restart the clock
      this.startClock();
    }
  }

  render() {
    const {
      classes,
      currentInterval,
      currentTime,
      done,
      progress,
      remainingSets,
      remainingTime,
      resting,
      running,
      targetIntervals,
      targetSets
    } = this.props;

    // progress = { totalTime?(totalTime / targetTime) * 100 : 0

    let statusMessage = "START";
    if (done) {
      statusMessage = "DONE";
    } else {
      if (currentInterval === 0 && targetSets === remainingSets) {
        statusMessage = "WARMUP";
      } else {
        if (progress) {
          if (!running) {
            statusMessage = "PAUSED";
          } else {
            statusMessage = resting ? "REST" : "WORK";
          }
        }
      }
    }

    return (
      <Grid
        container
        className={classes.container}
        justify="center"
        spacing={0}
      >
        <Grid item xs={12} sm={10} md={8} lg={7}>
          <Paper className={classes.clock}>
            <LinearProgress
              color={resting ? "primary" : "secondary"}
              variant="determinate"
              value={progress}
            />
            <div className={classes.clock_status}>{statusMessage}</div>
            <Grid container>
              <Grid item xs={12} sm={7}>
                <Typography variant="display1" color="inherit">
                  Interval {currentInterval} of {targetIntervals}
                </Typography>
                <Typography type="display3" className={classes.clock_display}>
                  {formatTime(currentTime)}
                </Typography>
              </Grid>
              <Grid container item xs={12} sm={5}>
                <Grid item xs={12}>
                  <Typography variant="title" style={{ fontWeight: "bold" }}>
                    Remaining
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={12}>
                  <Typography variant="title">Time</Typography>
                  <Typography variant="display2" color="inherit">
                    {formatTime(remainingTime)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={12}>
                  <Typography variant="title">Tabatas</Typography>
                  <Typography variant="display2" color="inherit">
                    {remainingSets}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <TimerControls
              done={done}
              running={running}
              onReset={this.resetClock}
              onToggle={running ? this.pauseClock : this.startClock}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Clock.propTypes = {
  done: PropTypes.bool,
  currentInterval: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  remainingSets: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
  resting: PropTypes.bool,
  running: PropTypes.bool,
  targetIntervals: PropTypes.number.isRequired,
  targetSets: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  toggleClock: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired
};

const mobile = isMobile();

const styles = theme => ({
  container: {
    marginTop: mobile ? "inherit" : "1rem",
    padding: 0,
    width: ""
  },
  clock_display: {
    fontSize: mobile ? "5rem" : "6rem"
  },
  clock_status: {
    fontSize: mobile ? "4rem" : "6rem"
  },
  clock: {
    padding: "1rem .75rem",
    backgroundColor: "rgba(244, 244, 248, 0.7)"
  }
});

export default withStyles(styles)(Clock);
