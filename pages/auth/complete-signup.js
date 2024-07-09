import authWrapper from "../../containers/hoc/authWrapper";
import CompleteSignUp from "../../components/auth/completeSignUp";

const CompleteSignUpPage = ({ auth }) => {
  return <CompleteSignUp auth={auth} />;
};

CompleteSignUpPage.propTypes = {};

export default authWrapper(CompleteSignUpPage);
