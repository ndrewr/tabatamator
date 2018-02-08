import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui-next/styles';

const styles = {
  alert: {
    height: '40px',
    width: '100%',
    boxSizing: 'border-box',
    padding: '.5rem',
    backgroundColor: 'black',
    color: 'white',
    opacity: 0
  },
  alert__visible: {
    opacity: 1
  }
};

const Alert = ({ classes, text = '' }) => (
  <div
    className={classnames(classes.alert, text ? classes.alert__visible : '')}
  >
    {text}
  </div>
);

export default withStyles(styles)(Alert);
