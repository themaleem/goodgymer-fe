import PropTypes from "prop-types";
import { useRef, useCallback } from "react";

const TextInput = ({
  name,
  id = "",
  // meta,
  input = {},
  value = "",
  type = "text",
  className = "",
  placeholder = "",
  onClick = undefined,
  onChange = undefined,
}) => {
  const inputRef = useRef();

  const change = useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      } else {
        input.onChange(event.currentTarget.value);
      }
    },
    [onChange, input]
  );

  return (
    <input
      id={id}
      name={name}
      ref={inputRef}
      onClick={onClick}
      onChange={change}
      className={className}
      placeholder={placeholder}
      value={input?.value || value}
      type={type || input.type || "text"}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  // meta: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
};

export default TextInput;
