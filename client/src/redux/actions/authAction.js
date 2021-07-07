import Api from "components/Api";
import { removeCookiesAuth } from "components/Utils/AuthServices";
import { setCookiesAuth } from "components/Utils/AuthServices";
import { ERROR_MESSAGE, set_error_message } from "./errorMessageAction";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export const login = (data) => {
  return async (dispatch) => {
    try {
      await Api.post("/login", data)
        .then((res) => {
          dispatch({ type: LOGIN, payload: res.data });
          setCookiesAuth(res.data);
        })
        .catch((e) => {
          dispatch({ type: ERROR_MESSAGE, payload: e.response.data });
        });
    } catch (error) {}
  };
};

export const setToken = (authstate) => {
  return (dispatch) => {
    dispatch({ type: SET_TOKEN, payload: authstate });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await removeCookiesAuth();
    dispatch({ type: LOGOUT });
  };
};
