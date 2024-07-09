import cookie from "cookie";

import {
  // signOut,
  // signingOut,
  signInSuccess,
} from "../reducers/auth/authReducer";
import { COOKIE_PROPS, DELETE_COOKIE_PROPS } from "../config/cookie";

const setAuthCookies = (headers) => {
  if (headers["access-token"]) {
    document.cookie = cookie.serialize(
      "access-token",
      headers["access-token"],
      COOKIE_PROPS
    );
    document.cookie = cookie.serialize("uid", headers.uid, COOKIE_PROPS);
    document.cookie = cookie.serialize("expiry", headers.expiry, COOKIE_PROPS);
    document.cookie = cookie.serialize("client", headers.client, COOKIE_PROPS);
  }
};

const removeDocumentAuthCookies = () => {
  document.cookie = cookie.serialize("uid", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("expiry", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("client", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("access-token", "", DELETE_COOKIE_PROPS);
};

const onSignIn = (response) => {
  const { email, name, id, profile_completed } = response.data.data;
  const payload = { email, name, id, profile_completed };
  window.REDUX_STORE.dispatch(signInSuccess(payload));
  setAuthCookies(response.headers);
};

export { onSignIn, setAuthCookies, removeDocumentAuthCookies };
