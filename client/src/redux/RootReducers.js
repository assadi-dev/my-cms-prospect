import { combineReducers, applyMiddleware, createStore } from "redux";

import AuthReducer from "./reducers/AuthReducer";
import EntreprisesReducer from "./reducers/EntreprisesReducer";
import errorMessageReducer from "./reducers/ErrorMessageReducer";
import modalStateReducer from "./reducers/modalStateReducer";
import rdvReducer from "./reducers/RdvReducer";

const RootReducer = combineReducers({
  AuthReducer,
  EntreprisesReducer,
  rdvReducer,
  modalStateReducer,
  errorMessageReducer,
});

export default RootReducer;
