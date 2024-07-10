import PropTypes from "prop-types";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const DatePicker = ({
  meta,
  name,
  value,
  input,
  options,
  onChange,
  withTime,
  className,
  placeholder,
}) => {
  const onDateChange = (date) =>
    onChange ? onChange(date) : input.onChange(date);

  return (
    <Flatpickr
      options={options}
      className={className}
      onChange={onDateChange}
      placeholder={placeholder}
      data-enable-time={withTime}
      name={input?.name ? input.name : name}
      value={input?.value ? input.value : value}
    />
  );
};

DatePicker.defaultProps = {
  meta: {},
  value: "",
  style: {},
  options: {},
  className: "",
  withTime: false,
  input: undefined,
  onChange: undefined,
  placeholder: "Select date...",
};

DatePicker.propTypes = {
  onChange: PropTypes.func,
  withTime: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]),
  placeholder: PropTypes.string,
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  options: PropTypes.instanceOf(Object),
};

export default DatePicker;
