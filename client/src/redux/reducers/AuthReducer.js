import jwtDecode from "jwt-decode";
import { LOGOUT } from "redux/actions/authAction";
import { SET_TOKEN } from "redux/actions/authAction";
import { LOGIN } from "redux/actions/authAction";

const initialState = {
  isLoading: true,
  token: null,
  refresh_token: null,
  userId: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
        userId: jwtDecode(action.payload.token).id,
      };
      break;

    case SET_TOKEN:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
        userId: jwtDecode(action.payload.token).id,
      };
      break;

    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        token: null,
        refresh_token: null,
        userId: null,
      };
      break;

    default:
      return state;
      break;
  }
};

export default AuthReducer;
