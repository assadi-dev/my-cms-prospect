import {
  ADD_ENTREPRISE,
  GET_ENTREPRISES,
  GET_CURRENT_ENTREPRISE,
  EDIT_ENTREPRISE,
  DELETE_ENTREPRISE,
} from "redux/actions/entreprisesAction";

const initialState = {
  isLoading: true,
  dataCollection: {},
  dataCheck: {},
  dataUncheck: {},
  currentData: {},
};

const EntreprisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
        dataCollection: [action.payload, ...state.dataCollection],
      };
      break;
    case GET_ENTREPRISES:
      return {
        ...state,
        isLoading: false,
        dataCollection: action.payload,
      };
      break;
    case GET_CURRENT_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
        currentData: action.payload,
      };
      break;

    case EDIT_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
        dataCollection: [
          ...state.dataCollection.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          }),
        ],
      };

      break;
    case DELETE_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
        dataCollection: [
          ...state.dataCollection.filter((item) => item.id != action.payload),
        ],
      };

      break;

    default:
      return state;
      break;
  }
};

export default EntreprisesReducer;
