import PropTypes from "prop-types";
import { Field } from "react-final-form";

import TextInput from "./textInput";
import { required } from "../../lib/objects";

const PasswordInput = ({ id = "password", name }) => {
  return (
    <Field
      name={name}
      type="password"
      className="input"
      validate={required}
      id={id || "password"}
      component={TextInput}
    />
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

export default PasswordInput;
