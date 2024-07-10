const unregisterSession =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      return response;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.delete(`/registrations/${values.id}`);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default unregisterSession;
