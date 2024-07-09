import PropTypes from "prop-types";
import { Field } from "react-final-form";

import TextInput from "./textInput";
import { required, validateEmail, composeValidators } from "../../lib/objects";

const EmailInput = ({
  name,
  change,
  id = "",
  className = "",
  placeholder = "",
}) => {
  const onChange = (e) => {
    const val = e.target.value.trim();
    change(name, val);
  };

  return (
    <Field
      id={id}
      name={name}
      type="text"
      onChange={onChange}
      component={TextInput}
      className={className}
      placeholder={placeholder}
      validate={composeValidators(required, validateEmail)}
    />
  );
};

EmailInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default EmailInput;
