import Link from "next/link";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";

import TextInput from "../inputs/textInput";
import { getPath } from "../../config/urls";
import EmailInput from "../inputs/emailInput";
import signUp from "../../actions/auth/signUp";
import { showNotification } from "../notification";
import PasswordInput from "../inputs/passwordInput";
import { FORM_SUBSCRIPTION } from "../../config/form";

const signInPath = getPath("signInPath").href;

const SignUp = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      password_confirmation: values.password,
      name: `${values.first_name} ${values.last_name}`,
    };

    return dispatch(signUp(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "You have successfully registered an account",
        });
      })
      .catch();
  };

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="step active" />
        <div className="step" />
      </div>

      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ form, submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>Register - Step 1</h2>
              <label htmlFor="name">First Name</label>
              <Field
                id="name"
                type="text"
                name="first_name"
                component={TextInput}
              />

              <label htmlFor="name">Last Name</label>
              <Field
                id="name"
                type="text"
                name="last_name"
                component={TextInput}
              />
              <label htmlFor="email">Email</label>
              <EmailInput
                id="email"
                name="email"
                change={form.change}
                placeholder="Enter Email"
              />
              <label htmlFor="password">Password</label>
              <PasswordInput name="password" />
              <button
                type="submit"
                disabled={submitting || hasValidationErrors}
              >
                Next
              </button>
              <p>
                Already have an account?{" "}
                <Link passHref href={signInPath}>
                  Sign In
                </Link>
              </p>
            </form>
          );
        }}
      />
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;
