import React from 'react';
// import Grid from 'material-ui-next/Grid';

import Typography from 'material-ui-next/Typography';

import Button from 'material-ui-next/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import { FormControl } from 'material-ui-next/Form';

import { withStyles } from 'material-ui-next/styles';

import Drawer from 'material-ui-next/Drawer';
import Divider from 'material-ui-next/Divider';
import IconButton from 'material-ui-next/IconButton';
import DirectionsRun from 'material-ui-icons-next/DirectionsRun';

import { DEFAULT_WORKOUT } from '../constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  drawerPaper: {
    // position: 'relative',
    position: 'absolute',
    height: '100%',
    width: 320,
    padding: 20
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap'
  // },
  formControl: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
});

// const Sidebar = ({ classes, open, handleDrawerClose, updateSettings }) => (
// get state values passed down
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    const {
      intervalTime,
      restTime,
      targetIntervals,
      targetSets
    } = props.settings;

    this.state = {
      intervalTime,
      restTime,
      targetIntervals,
      targetSets
    };
  }

  resetSettings = () => {
    this.setState({
      ...DEFAULT_WORKOUT
    });
  };

  updateField = fieldName => event => {
    console.log('new val is ', event.target.value);
    const value = event.target.value;
    // if (event.target.value) {
    this.setState({
      [fieldName]: value
    });
    // }
  };

  updateSettings = () => {
    const newSettings = Object.keys(this.state).reduce((settings, key) => {
      settings[key] = parseInt(this.state[key] || 0, 10);
      return settings;
    }, {});

    this.props.updateSettings(newSettings);

    this.setState(newSettings);
  };

  componentWillUpdate() {
    // if settings have been reset from parent...
  }

  render() {
    const { classes, open, handleDrawerClose } = this.props;
    const { intervalTime, restTime, targetIntervals, targetSets } = this.state;

    return (
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <Typography type="title" color="inherit">
              Configuration
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <DirectionsRun />
            </IconButton>
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="settings-num-sets">Tabatas</InputLabel>
            <Input
              id="settings-num-sets"
              value={targetSets}
              onChange={this.updateField('targetSets')}
              endAdornment={
                <InputAdornment position="start">sets</InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="settings-num-intervals">
              Intervals per set
            </InputLabel>
            <Input
              id="settings-num-intervals"
              value={targetIntervals}
              onChange={this.updateField('targetIntervals')}
              endAdornment={
                <InputAdornment position="start">intervals</InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            className={`${classes.formControl} ${classes.withoutLabel}`}
            aria-describedby="interval-length-seconds"
          >
            <InputLabel htmlFor="intervals-helper-text">
              Interval length
            </InputLabel>
            <Input
              id="settings-time-interval"
              value={intervalTime}
              onChange={this.updateField('intervalTime')}
              endAdornment={
                <InputAdornment position="start">Sec</InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="settings-time-rest">
              Interval rest time
            </InputLabel>
            <Input
              id="settings-time-rest"
              value={restTime}
              onChange={this.updateField('restTime')}
              endAdornment={
                <InputAdornment position="start">Sec</InputAdornment>
              }
            />
          </FormControl>
          <Divider />
          <Button
            className={classes.button}
            raised
            color="default"
            onClick={this.resetSettings}
          >
            RESET
          </Button>
          <Button
            className={classes.button}
            raised
            color="primary"
            onClick={this.updateSettings}
          >
            CONFIRM
          </Button>
          <Typography type="body2" gutterBottom>
            On CONFIRM current timer will be reset to start
          </Typography>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
