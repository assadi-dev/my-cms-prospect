import {
  MODAL_ADD_ENTREPRISE,
  MODAL_ADD_RDV,
  MODAL_EDIT_ENTREPRISE,
  MODAL_EDIT_RDV,
} from "../actions/modalStateAction";
const initialState = {
  addEntModalstate: false,
  editEntModalstate: false,
  addRdv: false,
  editRDV: false,
};

const modalStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_ADD_ENTREPRISE:
      return {
        ...state,
        addEntModalstate: action.payload,
      };
      break;

    case MODAL_EDIT_ENTREPRISE:
      return {
        ...state,
        editEntModalstate: action.payload,
      };
      break;

    case MODAL_ADD_RDV:
      return { ...state, addRdv: action.payload };
      break;
    case MODAL_EDIT_RDV:
      return { ...state, editRDV: action.payload };

    default:
      return state;
      break;
  }
};

export default modalStateReducer;
