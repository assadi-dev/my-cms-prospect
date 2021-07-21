import Api from "components/Api";

export const GET_ENTREPRISES = "GET_ENTREPRISES";
export const GET_CURRENT_ENTREPRISE = "GET_CURRENT_ENTREPRISE ";
export const EDIT_ENTREPRISE = "EDIT_ENTREPRISE";
export const ADD_ENTREPRISE = "ADD_ENTREPRISE";
export const DELETE_ENTREPRISE = "DELETE_ENTREPRISE";

export const get_entreprises = (token) => {
  const config = {
    Authorization: `${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return async (dispatch) => {
    try {
      await Api.get("/entreprises/?order[updateAt]=desc", {
        headers: config,
      }).then((res) => {
        dispatch({ type: GET_ENTREPRISES, payload: res.data });
      });
    } catch (e) {}
  };
};

export const get_current_entreprises = (token, id) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return async (dispatch) => {
    try {
      await Api.get(`/entreprises/${id}`, { headers: config }).then((res) => {
        dispatch({ type: GET_CURRENT_ENTREPRISE, payload: res.data });
      });
    } catch (error) {}
  };
};

export const add_entreprise = (token, data) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    await Api.post("/entreprises", data, { headers: config }).then((res) => {
      dispatch({ type: ADD_ENTREPRISE, payload: res.data });
    });
  };
};

export const update_entreprise = (token, id, data) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return async (dispatch) => {
    try {
      await Api.put(`/entreprises/${id}`, data, { headers: config }).then(
        (res) => {
          dispatch({ type: EDIT_ENTREPRISE, payload: res.data });
        }
      );
    } catch (error) {}
  };
};

export const delete_entreprise = (token, id) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return async (dispatch) => {
    try {
      Api.delete(`/entreprises/${id}`, { headers: config }).then((res) => {
        dispatch({ type: DELETE_ENTREPRISE, payload: id });
      });
    } catch (error) {}
  };
};
