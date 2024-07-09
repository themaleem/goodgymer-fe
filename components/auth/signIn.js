import Link from "next/link";
import { Form } from "react-final-form";
import { useDispatch } from "react-redux";

import { getPath } from "../../config/urls";
import EmailInput from "../inputs/emailInput";
import signIn from "../../actions/auth/signIn";
import { showNotification } from "../notification";
import PasswordInput from "../inputs/passwordInput";
import { FORM_SUBSCRIPTION } from "../../config/form";

const signUpPath = getPath("signUpPath").href;

const SignIn = ({ auth }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = { email: values.email, password: values.password };

    return dispatch(signIn(data))
      .then(() => {})
      .catch((err) => showNotification({ detail: "err?.data?.message" }));
  };

  return (
    <div className="container">
      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ form, submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>Sign In</h2>
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
                Sign In
              </button>

              <p>
                Don't have an account?{" "}
                <Link passHref href={signUpPath}>
                  Register an account
                </Link>
              </p>
            </form>
          );
        }}
      />
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
