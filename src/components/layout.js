import React from 'react';
import Grid from 'material-ui-next/Grid';
import { withStyles } from 'material-ui-next/styles';

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
  settings,
  closeDrawer,
  openDrawer,
  updateSettings
}) => (
  <Grid container className={classes.root}>
    <Navbar onMenuClick={openDrawer} />
    <Sidebar
      open={open}
      settings={settings}
      handleDrawerClose={closeDrawer}
      updateSettings={updateSettings}
    />
    {children}
  </Grid>
);

export default withStyles(styles)(Layout);
