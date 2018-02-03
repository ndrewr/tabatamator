import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';
// import MenuIcon from 'material-ui-icons-next/Menu';
import CodeIcon from 'material-ui-icons-next/Code';
import Update from 'material-ui-icons-next/Update';

import { APP_TITLE } from '../constants';

const styles = {
  root: {
    width: '100%'
  },
  appbar: {
    padding: '1rem',
    // backgroundColor: YELLOW
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  appbar_button: {
    color: 'inherit'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    // fontSize: 32,
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
        <Typography type="display1" color="inherit" className={classes.flex}>
          {APP_TITLE} <Update className={classes.logo} />
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
