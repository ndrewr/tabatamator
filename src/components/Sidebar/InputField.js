import React from "react";
import PropTypes from "prop-types";

import Input, { InputLabel, InputAdornment } from "material-ui-next/Input";
import { FormControl } from "material-ui-next/Form";
import { withStyles } from "material-ui-next/styles";

const InputField = ({ classes, name, label, units, value, updateField }) => {
  return (
    <FormControl className={classes.form__control}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        className={classes.form__input}
        id={name}
        value={value}
        onChange={updateField}
        endAdornment={<InputAdornment position="start">{units}</InputAdornment>}
        type="number"
      />
    </FormControl>
  );
};

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired
};

const styles = theme => ({
  form__control: {
    marginBottom: theme.spacing.unit,
    width: "100%"
  },
  form__input: {
    fontSize: "36px"
  }
});

export default withStyles(styles)(InputField);
