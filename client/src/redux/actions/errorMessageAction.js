export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const set_error_message = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ERROR_MESSAGE, payload: data });
    } catch (error) {}
  };
};
