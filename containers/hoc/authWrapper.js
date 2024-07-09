import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import useIsClient from "../hooks/useIsClient";
import useWithSWR from "../../components/swr/withSwr";
import { getPath, isPathType } from "../../config/urls";

import { ONLY_FOCUS_REVALIDATION } from "../../config/swr";
import getCurrentUser from "../../actions/user/getCurrentUser";

const onAuthPath = (pathname) => isPathType(pathname, "auth");
const onStaticPath = (pathname) => isPathType(pathname, "static");

const currentUserPath = getPath("currentUserPath").as;

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;
const completeSignupPath = getPath("completeSignupPath").href;

const authWrapper = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const isClient = useIsClient();

    let redirectTo;

    const pathname = isClient ? Router.pathname : "";

    const { auth, getCurrentUser } = props;

    const { user } = auth;

    const fetchOn = () => true;

    useWithSWR({
      fetchOn,
      baseUrl: currentUserPath,
      fetcher: getCurrentUser,
      config: ONLY_FOCUS_REVALIDATION,
    });

    // Handle Redirects
    // User who is unauthenticated but trying to visit an auth pages.
    const noUserAndNotOnAuthPath = () => {
      if (user === null && !onAuthPath(pathname)) {
        return (redirectTo = signInPath);
      }
      return undefined;
    };

    const userPresentWithoutGoodgymProfile = () => {
      if (user !== null && pathname !== completeSignupPath) {
        return (redirectTo = completeSignupPath);
      }

      return undefined;
    };

    // Handle Redirects
    // User who is authenticated but trying to visit an auth pages.
    // todo: redirect to sessions list path
    const userOnAuthPath = () => {
      if (user !== null && onAuthPath(pathname)) {
        return (redirectTo = homePath);
      }
      return undefined;
    };

    // when user is undefined move on to the component and render the component's skeleton
    // This block will not run on server since user on server will always be undefined per redux default state.
    //  also don't want to run these checks on homepath. it's static
    if (user !== undefined && pathname && !onStaticPath(pathname)) {
      if (noUserAndNotOnAuthPath()) {
      } else if (user) {
        if (!user.profile_completed) {
          userPresentWithoutGoodgymProfile();
        } else {
          userOnAuthPath();
        }
      }
    }

    if (redirectTo) Router.push(redirectTo);
    return redirectTo ? null : <WrappedComponent {...props} />;
  };

  function mapStateToProps({ auth, notification }) {
    return { notification, auth };
  }

  AuthWrapper.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
  };

  return connect(mapStateToProps, { getCurrentUser })(AuthWrapper);
};

export default authWrapper;
