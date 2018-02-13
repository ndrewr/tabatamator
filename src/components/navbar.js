import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui-next/AppBar';
import Button from 'material-ui-next/Button';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import CodeIcon from 'material-ui-icons-next/Code';
import IconButton from 'material-ui-next/IconButton';
import { withStyles } from 'material-ui-next/styles';

import { APP_TITLE } from '../constants';

const styles = {
  appbar: {
    padding: '1rem',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  appbar_button: {
    color: 'inherit'
  },
  app_title: {
    flex: 1,
    fontFamily: 'baloo chettan, quantico, sans-serif'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    height: 48,
    width: 48,
    verticalAlign: 'sub'
  }
};

function Navbar({ classes, onMenuClick }) {
  function onClick() {
    window.open(
      'https://www.active.com/fitness/articles/what-is-tabata-training'
    );
  }

  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        <Button
          className={classes.appbar_button}
          color="contrast"
          onClick={onClick}
        >
          WHAT
        </Button>
        <Typography
          type="display2"
          color="inherit"
          className={classes.app_title}
        >
          {APP_TITLE}
        </Typography>
        <IconButton
          className={classes.appbar_button}
          color="contrast"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <CodeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
