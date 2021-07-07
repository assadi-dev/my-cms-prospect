import ModalEditEntreprise from "components/Modal/ModalEditEntreprise";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button, CustomInput, Modal, ModalBody } from "reactstrap";
import { delete_entreprise } from "redux/actions/entreprisesAction";
import { get_current_entreprises } from "redux/actions/entreprisesAction";
import { update_entreprise } from "redux/actions/entreprisesAction";
import { set_modal_editEntreprise } from "redux/actions/modalStateAction";

const RowTableEntreprise = ({
  data,
  update_entreprise,
  delete_entreprise,

  token,
  set_modal_editEntreprise,
  get_current_entreprises,
}) => {
  const { id, nom, email, telephone, ville, checked } = data;

  const [state, setState] = useState({
    isChecked: false,
  });

  useEffect(() => {
    setState((prevState) => {
      return { ...prevState, isChecked: checked };
    });
  }, []);

  const handleChecked = async () => {
    try {
      await setState((prevState) => {
        return {
          ...prevState,
          isChecked: !prevState.isChecked,
        };
      });
      let data = { checked: !checked, updateAt: new Date() };

      await update_entreprise(token, id, data);
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await delete_entreprise(token, id);
    } catch (error) {}
  };

  const showEditModal = async () => {
    try {
      await get_current_entreprises(token, id);
      await set_modal_editEntreprise(true);
    } catch (error) {}
  };

  return (
    <>
      <tr>
        <td>
          <Col md="2">
            <CustomInput
              type="switch"
              id={`${id}`}
              checked={state.isChecked}
              onChange={handleChecked}
            />
          </Col>
        </td>
        <td>{nom}</td>
        <td>
          {" "}
          <a className="link-table" href={`mailto:${email}`}>
            {email}
          </a>{" "}
        </td>
        <td>{ville}</td>
        <td>{telephone}</td>
        <td className="text-center">
          {checked ? (
            <span className="text-success">Prospecté</span>
          ) : (
            <span className="text-warning">En attente</span>
          )}
        </td>
        <td className="text-center">
          <Button
            className="btn-link"
            color="info"
            size="sm"
            onClick={showEditModal}
          >
            <i className="far fa-eye"></i>
          </Button>
          {` `}
          <Button
            className="btn-link"
            color="danger"
            size="sm"
            onClick={handleDelete}
          >
            <i className="fa fa-times" />
          </Button>
        </td>
      </tr>
      <ModalEditEntreprise />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listEntreprise: state.EntreprisesReducer,
    AuthState: state.AuthReducer,
    token: state.AuthReducer.token,
    modalState: state.modalStateReducer.editEntModalstate,
  };
};

const mapDispatchToProps = {
  update_entreprise,
  delete_entreprise,
  set_modal_editEntreprise,
  get_current_entreprises,
};

export default connect(mapStateToProps, mapDispatchToProps)(RowTableEntreprise);
