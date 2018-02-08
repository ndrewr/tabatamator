import React from 'react';
import classnames from 'classnames';
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

// import Popover from 'material-ui-next/Popover';

import { DEFAULT_WORKOUT } from '../constants';

const Alert = ({ classes, open, msg = 'HELLO WORLD' }) => (
  <div
    className={classnames(classes.alert, open ? classes.alert__visible : '')}
  >
    {msg}
  </div>
);

const styles = theme => ({
  drawer: {
    width: 320,
    padding: 40,
    paddingTop: 20
  },
  drawer__header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  form__control: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  form__input: {
    fontSize: '36px'
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit,
    width: '45%',
    fontSize: '1.2rem'
  },
  sidebar__divider: {
    margin: theme.spacing.unit * 2
  },

  alert: {
    height: '40px',
    width: '100%',
    padding: '.5rem',
    backgroundColor: 'black',
    color: 'white',
    opacity: 0
  },
  alert__visible: {
    opacity: 1
  }
});

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
      targetSets,

      showAlert: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.settings });
  }

  resetSettings = () => {
    this.setState({
      ...DEFAULT_WORKOUT
    });
  };

  loadWorkout = () => {
    this.props
      .loadWorkout()
      .then(saveData => {
        this.setState({
          ...saveData
        });
      })
      .catch(error => {
        console.log('Error loading saved workout...', error);
      });
  };

  saveWorkout = () => {
    this.setState({ showAlert: true });

    this.props
      .saveWorkout()
      .then(savedWorkout => {
        setTimeout(() => {
          this.setState({ showAlert: false });
        }, 3000);
      })
      .catch(err => {
        console.log('There was a problem saving the workout :(');
      });
  };

  updateField = fieldName => event => {
    const value = event.target.value;

    this.setState({
      [fieldName]: value
    });
  };

  updateSettings = () => {
    const newSettings = Object.keys(this.state).reduce((settings, key) => {
      settings[key] = parseInt(this.state[key] || 0, 10);
      return settings;
    }, {});

    this.props.updateSettings(newSettings);

    this.setState(newSettings);
  };

  render() {
    const { classes, open, handleDrawerClose } = this.props;
    const {
      intervalTime,
      restTime,
      showAlert,
      targetIntervals,
      targetSets
    } = this.state;

    return (
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawer
        }}
        anchor="right"
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawer__header}>
            <Typography type="title" color="inherit">
              Configuration
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <DirectionsRun />
            </IconButton>
          </div>
          <FormControl className={classes.form__control}>
            <InputLabel htmlFor="settings-num-sets">Tabatas</InputLabel>
            <Input
              className={classes.form__input}
              id="settings-num-sets"
              value={targetSets}
              onChange={this.updateField('targetSets')}
              endAdornment={
                <InputAdornment position="start">sets</InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.form__control}>
            <InputLabel htmlFor="settings-num-intervals">
              Intervals per set
            </InputLabel>
            <Input
              className={classes.form__input}
              id="settings-num-intervals"
              value={targetIntervals}
              onChange={this.updateField('targetIntervals')}
              endAdornment={
                <InputAdornment position="start">intervals</InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            className={`${classes.form__control} ${classes.withoutLabel}`}
            aria-describedby="interval-length-seconds"
          >
            <InputLabel htmlFor="intervals-helper-text">
              Interval length
            </InputLabel>
            <Input
              className={classes.form__input}
              id="settings-time-interval"
              value={intervalTime}
              onChange={this.updateField('intervalTime')}
              endAdornment={
                <InputAdornment position="start">Sec</InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.form__control}>
            <InputLabel htmlFor="settings-time-rest">
              Interval rest time
            </InputLabel>
            <Input
              className={classes.form__input}
              id="settings-time-rest"
              value={restTime}
              onChange={this.updateField('restTime')}
              endAdornment={
                <InputAdornment position="start">Sec</InputAdornment>
              }
            />
          </FormControl>
          <Divider className={classes.sidebar__divider} />
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

          <Divider className={classes.sidebar__divider} />
          <Button
            className={classes.button}
            raised
            color="default"
            onClick={this.saveWorkout}
          >
            SAVE WORKOUT
          </Button>
          <Button
            className={classes.button}
            raised
            color="default"
            onClick={this.loadWorkout}
          >
            LOAD WORKOUT
          </Button>
        </div>

        <Alert classes={classes} open={showAlert} />
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
