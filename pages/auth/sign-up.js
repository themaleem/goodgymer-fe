import PropTypes from "prop-types";

import SignUp from "../../components/auth/signUp";
import authWrapper from "../../containers/hoc/authWrapper";

const SignUpPage = () => {
  return <SignUp />;
};

SignUpPage.propTypes = {};

// export default SignUpPage;
export default authWrapper(SignUpPage);
