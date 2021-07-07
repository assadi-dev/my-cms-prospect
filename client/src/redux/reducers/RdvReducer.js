const { GET_CURRENT_RDV } = require("redux/actions/rdvAction");
const { DELETE_RDV } = require("redux/actions/rdvAction");
const { EDIT_RDV } = require("redux/actions/rdvAction");
const { GET_RDV } = require("redux/actions/rdvAction");
const { ADD_RDV } = require("redux/actions/rdvAction");

const initialState = {
  isLoading: true,
  dataCollection: {},
  dataCheck: {},
  dataUncheck: {},
  currentData: {},
};

const rdvReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RDV:
      return {
        ...state,
        isloading: false,
        dataCollection: [action.payload, ...state.dataCollection],
      };
      break;
    case GET_RDV:
      return {
        ...state,
        isLoading: false,
        dataCollection: action.payload,
      };
      break;
    case GET_CURRENT_RDV:
      return {
        ...state,
        isLoading: false,
        currentData: action.payload,
      };
      break;
    case EDIT_RDV:
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
    case DELETE_RDV:
      return {
        ...state,
        isLoading: false,
        dataCollection: [
          ...state.dataCollection.filter((item) => item.id !== action.payload),
        ],
      };
      break;

    default:
      return state;
      break;
  }
};

export default rdvReducer;
