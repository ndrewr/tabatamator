import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';
import MenuIcon from 'material-ui-icons-next/Menu';
import CodeIcon from 'material-ui-icons-next/Code';

import { APP_TITLE } from '../constants';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar({ classes }) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="contrast">login</Button>        
          <Typography type="title" color="inherit" className={classes.flex}>
            { APP_TITLE }
          </Typography>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
            <CodeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
