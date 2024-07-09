import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";

import { getPath } from "../../config/urls";
import { required } from "../../lib/objects";
import SelectInput from "../inputs/selectInput";
import { FORM_SUBSCRIPTION } from "../../config/form";
import completeSignUp from "../../actions/auth/updateProfile";

const homePath = getPath("homePath").href;

// mimic currently supported areas
const areas = [
  { value: "london", label: "London" },
  { value: "sheffield", label: "Sheffield" },
  { value: "birmingham", label: "Birmingham " },
];

const roles = [
  { value: "regular", label: "Regular" },
  { value: "task_force", label: "Task Force" },
];

const CompleteSignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = {
      role: values.role.value,
      area_id: values.area_id.value,
    };

    return dispatch(completeSignUp(data))
      .then(() => {
        // @note no need to reroute, the auth wrapper will take over from here
      })
      .catch();
  };

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="step active" />
        <div className="step active" />
      </div>

      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>Register - Step 2</h2>
              <label htmlFor="role">Role</label>
              <Field
                name="role"
                options={roles}
                validate={required}
                component={SelectInput}
                placeholder="Select Role"
              />

              <label htmlFor="city">Area (City)</label>
              <Field
                name="area_id"
                options={areas}
                validate={required}
                component={SelectInput}
                placeholder="Select Area"
              />
              <br />
              <button
                type="submit"
                disabled={submitting || hasValidationErrors}
              >
                Complete Registration
              </button>
            </form>
          );
        }}
      />
    </div>
  );
};

CompleteSignUp.propTypes = {};

export default CompleteSignUp;
