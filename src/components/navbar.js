import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AppBar from 'material-ui-next/AppBar';
import Button from 'material-ui-next/Button';
import CodeIcon from 'material-ui-icons-next/Code';
import IconButton from 'material-ui-next/IconButton';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';

import { APP_TITLE } from '../constants';

function Navbar({ classes, onHelpClick, onMenuClick }) {
  function onClick() {
    onHelpClick();
  }

  return (
    <AppBar id="app_nav" className={classes.appbar} position="static">
      <Toolbar className={classes.toolbar}>
        <Button
          className={classnames(
            classes.appbar_button,
            classes.appbar_button__left
          )}
          color="secondary"
          onClick={onClick}
        >
          ?
        </Button>
        <Typography
          className={classnames('title', classes.app_title)}
          color="inherit"
          type="display2"
        >
          {APP_TITLE}
        </Typography>
        <IconButton
          className={classes.appbar_button}
          aria-label="Menu"
          color="secondary"
          onClick={onMenuClick}
        >
          <CodeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onMenuClick: PropTypes.func.isRequired
};

const styles = {
  appbar: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  toolbar: {
    width: '100%',
    maxWidth: '1200px'
  },
  appbar_button: {
    color: 'inherit'
  },
  app_title: {
    flex: 1,
    fontFamily: 'baloo chettan, quantico, sans-serif'
  },
  appbar_button__left: {
    minWidth: '40px'
  }
};

export default withStyles(styles)(Navbar);
