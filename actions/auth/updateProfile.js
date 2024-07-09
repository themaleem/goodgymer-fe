const completeSignUp =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        return response.data;
      }
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.post("/goodgymers", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default completeSignUp;
