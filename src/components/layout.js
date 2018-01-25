import React from 'react';
import Grid from 'material-ui-next/Grid';
import { withStyles } from 'material-ui-next/styles';
// import Update from 'material-ui-icons-next/Update';

// import { APP_TITLE } from '../constants';

import Navbar from './navbar';
import Sidebar from './sidebar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  header: {
    padding: '1rem'
  }
});

const Layout = ({
  children,
  classes,
  open,
  closeDrawer,
  openDrawer,
  updateSettings
}) => (
  <Grid container className={classes.root}>
    <Navbar onMenuClick={openDrawer} />
    <Sidebar
      open={open}
      handleDrawerClose={closeDrawer}
      updateSettings={updateSettings}
    />
    <Grid item xs={12} className={classes.header} />
    {children}
  </Grid>
);

export default withStyles(styles)(Layout);
