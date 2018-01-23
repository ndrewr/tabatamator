import React from 'react';
// import Grid from 'material-ui-next/Grid';

import Typography from 'material-ui-next/Typography';

import Button from 'material-ui-next/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import { FormControl, FormHelperText } from 'material-ui-next/Form';

import { withStyles } from 'material-ui-next/styles';

import Drawer from 'material-ui-next/Drawer';
import Divider from 'material-ui-next/Divider';
import IconButton from 'material-ui-next/IconButton';
import DirectionsRun from 'material-ui-icons-next/DirectionsRun';

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
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
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

const Sidebar = ({ classes, open, handleDrawerClose }) => (
  <Drawer
    type="persistent"
    classes={{
      paper: classes.drawerPaper
    }}
    anchor={'left'}
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
          value={1}
          onChange={() => console.log('changed!')}
          endAdornment={<InputAdornment position="start">sets</InputAdornment>}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="settings-num-intervals">Tabatas</InputLabel>
        <Input
          id="settings-num-intervals"
          value={8}
          onChange={() => console.log('changed!')}
          endAdornment={
            <InputAdornment position="start">intervals</InputAdornment>
          }
        />
      </FormControl>
      <FormControl
        className={`${classes.formControl} ${classes.withoutLabel}`}
        aria-describedby="interval-length-seconds"
      >
        <FormHelperText id="intervals-helper-text">
          Interval length
        </FormHelperText>
        <Input
          id="settings-time-interval"
          value={20}
          onChange={() => console.log('changed!')}
          endAdornment={<InputAdornment position="end">Sec</InputAdornment>}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="settings-time-rest">Interval rest time</InputLabel>
        <Input
          id="settings-time-rest"
          value={10}
          onChange={() => console.log('changed!')}
          endAdornment={<InputAdornment position="start">Sec</InputAdornment>}
        />
      </FormControl>
      <Divider />
      <Button className={classes.button} raised color="secondary">
        RESET
      </Button>
      <Button className={classes.button} raised color="primary">
        CONFIRM
      </Button>
      <Typography type="body2" gutterBottom>
        On CONFIRM current timer will be reset to start
      </Typography>
    </div>
  </Drawer>
);

export default withStyles(styles)(Sidebar);
