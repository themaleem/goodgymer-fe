import { onSignIn } from "../../lib/auth";

const signIn =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      onSignIn(response);
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.post("/auth/sign_in", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default signIn;
