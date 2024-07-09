import { signInSuccess } from "../../reducers/auth/authReducer";

const getCurrentUser =
  (url) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      const { user, goodgymer } = response.data;
      const payload = { ...user };
      if (goodgymer) {
        const { role, area_id } = goodgymer;
        payload.role = role;
        payload.area_id = area_id;
      }

      dispatch(signInSuccess(payload));
      return payload;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.get(url);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default getCurrentUser;
