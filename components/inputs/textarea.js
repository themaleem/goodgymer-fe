import PropTypes from "prop-types";
import { useRef, useCallback } from "react";

const TextArea = ({
  id,
  meta,
  name,
  value,
  input,
  onChange,
  className,
  placeholder,
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
    <textarea
      id={id}
      ref={inputRef}
      onChange={change}
      className={className}
      placeholder={placeholder}
      name={input.name || name}
      value={input?.value || value}
    />
  );
};

TextArea.defaultProps = {
  id: "",
  name: "",
  meta: {},
  input: {},
  value: "",
  className: "",
  placeholder: "",
  onChange: undefined,
};

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
};

export default TextArea;
