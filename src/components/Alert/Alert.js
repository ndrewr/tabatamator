import React from "react";
import classnames from "classnames";

import Typography from "material-ui-next/Typography";
import { withStyles } from "material-ui-next/styles";

const styles = {
  alert: {
    height: "40px",
    width: "100%",
    boxSizing: "border-box",
    padding: ".5rem",
    backgroundColor: "red",
    color: "white",
    opacity: 0
  },
  alert__visible: {
    opacity: 0.85
  }
};

const Alert = ({ classes, text = "" }) => (
  <Typography
    align="center"
    className={classnames(classes.alert, text ? classes.alert__visible : "")}
    variant="button"
  >
    {text}
  </Typography>
);

export default withStyles(styles)(Alert);
