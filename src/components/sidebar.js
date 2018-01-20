import React from 'react';
// import Grid from 'material-ui-next/Grid';
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
    width: 320
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
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
        <IconButton onClick={handleDrawerClose}>
          <DirectionsRun />
        </IconButton>
      </div>
      <Divider />
      <h4>One</h4>
      <h4>Two</h4>
      <h4>Three</h4>
    </div>
  </Drawer>
);

export default withStyles(styles)(Sidebar);
