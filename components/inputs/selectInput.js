import Select from "react-select";
import PropTypes from "prop-types";
import { useCallback } from "react";

const SelectInput = ({
  id,
  meta,
  input,
  value,
  options,
  onChange,
  className,
  placeholder,
  defaultValue,
}) => {
  const handleChange = useCallback(
    (event) => {
      if (input.onChange && event != null) {
        input.onChange(event);
      } else {
        input.onChange(null);
      }
    },
    [input]
  );

  return (
    <div style={{ position: "relative" }}>
      <Select
        id={id}
        options={options}
        name={input?.name}
        menuPlacement="auto"
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={input?.value || value}
        menuShouldScrollIntoView="true"
        onChange={onChange || handleChange}
      />
    </div>
  );
};

SelectInput.defaultProps = {
  id: "",
  meta: {},
  className: "",
  input: undefined,
  value: undefined,
  onChange: undefined,
  defaultValue: undefined,
  placeholder: "Select an option",
};

SelectInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  value: PropTypes.instanceOf(Object),
  defaultValue: PropTypes.instanceOf(Object),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectInput;
