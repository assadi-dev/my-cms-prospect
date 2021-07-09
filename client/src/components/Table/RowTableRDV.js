import { minHours } from "components/Utils/DateServices";
import { minDateMonth } from "components/Utils/DateServices";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Col, CustomInput } from "reactstrap";
import { edit_rdv, delete_rdv } from "redux/actions/rdvAction";
import ModalEditEvent from "components/Modal/ModalEditEvent";
import { get_current_rdv } from "redux/actions/rdvAction";
import { set_modal_editRdv } from "redux/actions/modalStateAction";

const RowTableRDV = ({
  data,
  authState,
  edit_rdv,
  delete_rdv,
  get_current_rdv,
  set_modal_editRdv,
  modalEditState,
}) => {
  const { id, nom, date, ville, checked, createdAt } = data;

  const [state, setState] = useState({
    isChecked: false,
  });

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        isChecked: checked,
      };
    });
  }, []);

  const handleCheck = async () => {
    await setState((prevState) => {
      return {
        ...prevState,
        isChecked: !prevState.isChecked,
      };
    });

    try {
      let data = { checked: !checked, updateAt: new Date() };
      await edit_rdv(authState.token, id, data);
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await delete_rdv(authState.token, id);
    } catch (error) {}
  };

  const handleShowCurrentEvent = async () => {
    await get_current_rdv(authState.token, id);
    await set_modal_editRdv(true);
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
              onChange={handleCheck}
            />
          </Col>
        </td>
        <td>{nom}</td>
        <td>{minDateMonth(date)}</td>
        <td className="text-center">{minHours(date)}</td>
        <td className="text-center">{ville}</td>
        <td className="text-center">
          {checked ? (
            <span className="text-success">Terminé</span>
          ) : (
            <span className="text-warning">En attente</span>
          )}
        </td>
        <td className="text-center">
          <Button
            className="btn-link"
            color="info"
            size="md"
            onClick={handleShowCurrentEvent}
          >
            <i className="tim-icons icon-pencil"></i>
          </Button>
          {` `}
          <Button
            className="btn-link"
            color="danger"
            size="md"
            onClick={handleDelete}
          >
            <i className="tim-icons icon-simple-remove" />
          </Button>
        </td>
      </tr>
    </>
  );
};

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
  modalEditState: state.modalStateReducer.editRDV,
});

const mapDispatchToProps = {
  edit_rdv,
  delete_rdv,
  get_current_rdv,
  set_modal_editRdv,
};

export default connect(mapStateToProps, mapDispatchToProps)(RowTableRDV);
