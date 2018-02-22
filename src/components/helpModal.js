import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import Dialog, { DialogTitle, DialogContent } from 'material-ui-next/Dialog';
// import Grid from 'material-ui-next/Grid';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';

const HelpModal = ({ classes, open, handleClose }) => {
  // show links with Tabata workout info
  // show link and icon for github
  // brief description how-to-use
  console.log('create modal!');
  return (
    <Dialog
      className={classes.container}
      open={open}
      onClose={handleClose}
      aria-labelledby="help-window"
    >
      <DialogTitle id="tabatamator-help-window">About Tabatamator</DialogTitle>
      <DialogContent>
        <Typography type="headline" color="inherit">
          <a href="">Info on the Tabata workout protocol</a>
        </Typography>
        <Typography type="headline" color="inherit">
          <a href="">Tabata vs HIIT training</a>
        </Typography>
        <Typography type="body2" color="inherit">
          <p>
            The default tabata workout consists of sets of eight 20-second
            intense workout intervals broken up with 10-second rest intervals.
          </p>
          <p>
            Workouts can be customised via the configuration menu accessible by
            tapping the left menu button.
          </p>
          <p>
            A favorite custom workout can be saved or loaded with the
            "cloud-upload" and "cloud download" buttons, respectively.\n A
            favorite workout will load automatically the next time you open
            Tabatamator.
          </p>
        </Typography>
        <Typography type="subheading" color="inherit">
          <a href="#">Tabatamator was created by Andrew R</a>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  container: {
    padding: '2rem'
  }
};

HelpModal.propTypes = {};

export default withStyles(styles)(HelpModal);
