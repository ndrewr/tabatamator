import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Grid from "material-ui-next/Grid";
import Schedule from "material-ui-icons-next/Schedule";
import Typography from "material-ui-next/Typography";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "material-ui-next/styles";

import Clock from "./Clock";
import HelpModal from "./HelpModal";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { APP_THEME } from "../constants";

import sound from "../soundPlayer";

import { withWorkoutDataContext } from "../contexts/WorkoutDataContext";

class App extends React.Component {
  state = {
    open: false,
    showHelp: false
  };

  handleDrawerOpen = () => {
    this.props.context.toggleClock(false);

    this.setState({
      open: true
    });
  };

  handleDrawerClose = () => {
    this.props.context.toggleClock(Boolean(this.props.context.totalTime));

    this.setState({
      open: false
    });
  };

  handleBodyClose = e => {
    // console.log("body click", e.target.tagName);
    if (this.state.open && e.target.tagName !== "INPUT") {
      this.handleDrawerClose();
    }
  };

  handleHelpOpen = () => {
    this.props.context.toggleClock(false);

    this.setState(state => ({
      showHelp: true
    }));
  };

  handleHelpClose = () => {
    this.props.context.toggleClock(Boolean(this.props.context.totalTime));

    this.setState({
      showHelp: false
    });
  };

  // // currently only supports one saved workout
  // saveWorkout = (workoutNumber = 1) => {
  //   // fun way to one-line the below assignment
  //   // const workoutSettings = (({ intervalTime, restTime, targetIntervals, targetSets }) => ({ intervalTime, restTime, targetIntervals, targetSets }))(this.state)
  //   const {
  //     intervalTime,
  //     restTime,
  //     targetIntervals,
  //     targetSets,
  //     setRestTime,
  //     warmupTime
  //   } = this.state;
  //   const workoutSettings = {
  //     intervalTime,
  //     restTime,
  //     setRestTime,
  //     targetSets,
  //     targetIntervals,
  //     warmupTime
  //   };

  //   // save the workout to storage
  //   return db.setItem(
  //     `workout${workoutNumber}`,
  //     JSON.stringify(workoutSettings)
  //   );
  // };

  playSound = workoutStatus => {
    const { currentTime, resting } = this.state;

    if (workoutStatus === "FINISH") {
      sound.play("finish");
    } else if (workoutStatus === "WORK") {
      const nextSecond = currentTime - 1;
      if (nextSecond === 0) {
        sound.play(resting ? "bell" : "horn");
      } else {
        sound.play(nextSecond.toString());
      }
    }
  };

  render() {
    const { classes, context } = this.props;
    const { loading, open } = this.state;

    const { done, resting, totalTime } = context;

    const theme = createMuiTheme(APP_THEME);

    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          alignContent="flex-start"
          className={classnames(
            "app",
            classes.global_styles,
            classes.root,
            done ? "gplay" : "tinyGrid",
            resting ? "blue" : "red",
            !totalTime && "grey2",
            done && "yellow"
          )}
          spacing={0}
          onClick={this.handleBodyClose}
        >
          <HelpModal
            open={this.state.showHelp}
            handleClose={this.handleHelpClose}
          />
          <Grid item xs={12}>
            <Navbar
              onMenuClick={
                open ? this.handleDrawerClose : this.handleDrawerOpen
              }
              onHelpClick={this.handleHelpOpen}
            />
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Typography type="display2" color="inherit">
                LOADING <Schedule style={{ width: "2rem", height: "2rem" }} />
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Clock />
            </Grid>
          )}
          <Sidebar open={open} handleDrawerClose={this.handleDrawerClose} />
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
    fontFamily: "quantico, sans-serif",
    height: "100%",
    boxSizing: "border-box"
  },
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  header: {
    padding: "1rem"
  }
});

export default withStyles(styles)(withWorkoutDataContext(App));
