import React from 'react';

// import Button from 'material-ui-next/Button';
import Grid from 'material-ui-next/Grid';
import Paper from 'material-ui-next/Paper';
import { withStyles } from 'material-ui-next/styles';
// import Delete from 'material-ui-icons-next/Delete';
// import Done from 'material-ui-icons-next/Done';
// import Pause from 'material-ui-icons-next/Pause';
import Update from 'material-ui-icons-next/Update';



import { APP_TITLE } from '../constants'

import Clock from './clock'
import Navbar from './navbar'

const inlineStyles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  header: {
    padding: '1rem',
  },
  logo: {
    // fontSize: 32,
    height: 48,
    width: 48,
    verticalAlign: 'bottom',
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
    <Grid item xs={12} className={classes.header}>
      <h1>
        { APP_TITLE } <Update className={classes.logo} />
      </h1>
    </Grid>
    { children }
  </Grid>
);

export default withStyles(styles)(Layout);
