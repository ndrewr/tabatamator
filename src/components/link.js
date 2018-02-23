import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui-next/styles';

import { BLUE } from '../constants';

const Link = ({ classes, text, url }) => {
  return (
    <a className={classes.link_text} href={url} target="window">
      {`${text || url} >`}
    </a>
  );
};

const styles = {
  link_text: {
    textDecoration: 'none',
    color: BLUE
  }
};

Link.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default withStyles(styles)(Link);
