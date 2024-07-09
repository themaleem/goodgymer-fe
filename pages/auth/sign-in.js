import SignIn from "../../components/auth/signIn";
import authWrapper from "../../containers/hoc/authWrapper";

const SignInPage = ({ auth }) => {
  return <SignIn auth={auth} />;
};
SignInPage.propTypes = {};

export default authWrapper(SignInPage);
