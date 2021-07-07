import { ERROR_MESSAGE } from "redux/actions/errorMessageAction";

const initialState = {};

const errorMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return action.payload;
      break;

    default:
      return state;
      break;
  }
};

export default errorMessageReducer;
