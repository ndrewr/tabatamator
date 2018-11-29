import React from "react";
import PropTypes from "prop-types";

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText
} from "material-ui-next/Dialog";
import AlarmOn from "material-ui-icons-next/AlarmOn";
import FitnessIcon from "material-ui-icons-next/FitnessCenter";
import Typography from "material-ui-next/Typography";
import { withStyles } from "material-ui-next/styles";

import Link from "./Link";

import { APP_TITLE } from "../../constants";

const HelpModal = ({ classes, open, handleClose }) => {
  return (
    <Dialog
      className={classes.container}
      open={open}
      onClose={handleClose}
      aria-labelledby="help-window"
      PaperProps={{ style: { margin: "22px" } }}
    >
      <DialogTitle id="tabatamator-help-window" disableTypography>
        <Typography variant="title" className={classes.modal_title}>
          About {APP_TITLE}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="title" gutterBottom>
          <Link
            text="Tabata workout"
            url="https://breakingmuscle.com/fitness/the-tabata-revolution-explained-what-why-and-how-to-tabata"
          />
        </Typography>
        <Typography variant="title" gutterBottom>
          <Link
            text="Tabata vs HIIT"
            url="https://grokker.com/fitness/interval-training-hiit/tips/tabata-vs-hiit"
          />
        </Typography>
        <Typography align="center" variant="display1" gutterBottom>
          <AlarmOn />
        </Typography>
        <DialogContentText className={classes.modal_text}>
          The default tabata protocol consists of sets of eight 20-second
          intense workout intervals broken up with 10-second rest intervals.
        </DialogContentText>

        <DialogContentText className={classes.modal_text}>
          Workouts can be customised via the configuration menu accessible by
          tapping the right menu button.
        </DialogContentText>

        <DialogContentText className={classes.modal_text}>
          A favorite custom workout can be saved or loaded with the
          "cloud-upload" and "cloud download" buttons, respectively. A favorite
          workout will load automatically the next time you open Tabatamator.
        </DialogContentText>

        <Typography align="center" variant="display1" gutterBottom>
          <FitnessIcon />
        </Typography>
        <Typography variant="subheading" color="inherit">
          <Link
            text="Tabatamator was created by Andrew R"
            url="https://github.com/uncleoptimus/tabatamator"
          />
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  container: {
    padding: "2rem"
  },
  modal_text: {
    marginBottom: "1rem"
  },
  modal_title: {
    fontFamily: "baloo chettan, quantico, sans-serif"
  }
};

HelpModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(HelpModal);
