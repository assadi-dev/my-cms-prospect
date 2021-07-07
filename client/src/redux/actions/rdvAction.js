import Api from "../../components/Api";
export const GET_RDV = "GET_RDV";
export const GET_CURRENT_RDV = "GET_CURRENT_RDV";
export const EDIT_RDV = "EDIT_RDV";
export const ADD_RDV = "ADD_RDV";
export const DELETE_RDV = "DELETE_RDV";

export const add_rdv = (token, data) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    let cleanData = {
      ...data,
      date: new Date(`${data.date} ${data.heure}`),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      Api.post("/rendez_vouses", cleanData, { headers: config })
        .then((res) => {
          dispatch({ type: ADD_RDV, payload: res.data });
        })
        .catch((e) => console.log(e));
    } catch (error) {}
  };
};

export const get_rdv = (token) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    try {
      await Api.get("/rendez_vouses?order[updatedAt]=desc&order[date]=desc", {
        headers: config,
      }).then((res) => {
        dispatch({ type: GET_RDV, payload: res.data });
      });
    } catch (error) {}
  };
};

export const get_current_rdv = (token, id) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    try {
      await Api.get(`/rendez_vouses/${id}`, { headers: config }).then((res) => {
        dispatch({ type: GET_CURRENT_RDV, payload: res.data });
      });
    } catch (error) {}
  };
};

export const edit_rdv = (token, id, data) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    try {
      await Api.put(`/rendez_vouses/${id}`, data, { headers: config }).then(
        (res) => {
          dispatch({ type: EDIT_RDV, payload: res.data });
        }
      );
    } catch (error) {}
  };
};

export const delete_rdv = (token, id) => {
  const config = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    try {
      await Api.delete(`/rendez_vouses/${id}`, { headers: config }).then(
        (res) => {
          dispatch({ type: DELETE_RDV, payload: id });
        }
      );
    } catch (error) {}
  };
};
