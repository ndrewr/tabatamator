import React from 'react';
import Grid from 'material-ui-next/Grid';
import { withStyles } from 'material-ui-next/styles';
// import Update from 'material-ui-icons-next/Update';

import { APP_TITLE } from '../constants';

import Navbar from './navbar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  header: {
    padding: '1rem'
  }
});

// <Grid
//   container
//   className={classes.demo}
//   alignItems={"center"}
//   justify={"center"}
// >
// </Grid>
// {
//   [0, 1, 2].map(value => (
//     <Grid key={value} item>
//       <Paper className={classes.paper} />
//     </Grid>
//   ))
// }

const Layout = ({ children, classes }) => (
  <Grid container className={classes.root}>
    <Navbar />
    <Grid item xs={12} className={classes.header} />
    {children}
  </Grid>
);

export default withStyles(styles)(Layout);
