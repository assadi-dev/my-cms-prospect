export const MODAL_ADD_ENTREPRISE = "MODAL_ADD_ENTREPRISE";
export const MODAL_EDIT_ENTREPRISE = "MODAL_EDIT_ENTREPRISE";
export const MODAL_ADD_RDV = "MODAL_ADD_RDV";
export const MODAL_EDIT_RDV = "MODAL_EDIT_RDV ";

export const set_modal_addEntreprise = (state) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MODAL_ADD_ENTREPRISE, payload: state });
    } catch (error) {}
  };
};

export const set_modal_editEntreprise = (state) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MODAL_EDIT_ENTREPRISE, payload: state });
    } catch (error) {}
  };
};

export const set_modal_addRdv = (state) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MODAL_ADD_RDV, payload: state });
    } catch (error) {}
  };
};

export const set_modal_editRdv = (state) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MODAL_EDIT_RDV, payload: state });
    } catch (error) {}
  };
};
