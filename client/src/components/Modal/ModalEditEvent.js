import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Button,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { set_modal_editRdv } from "redux/actions/modalStateAction";
import {
  minDateMonthReverse,
  minHours,
  minDateMonth,
} from "components/Utils/DateServices";
import { edit_rdv } from "redux/actions/rdvAction";

export const ModalEditEvent = ({
  modalEditState,
  currentEvent,
  authState,
  edit_rdv,
  set_modal_editRdv,
}) => {
  const { id, nom, date, ville, description, color, updatedAt } = currentEvent;
  const initialInput = {
    nom: nom,
    ville: ville,
    date: date,
    description: description,
    color: color,
    updatedAt: updatedAt,
    userId: `/api/users/${authState.userId}`,
  };

  const [inputValue, setInputValue] = useState(initialInput);

  useEffect(() => {
    let cleanArray = {
      ...initialInput,
      date: minDateMonthReverse(initialInput.date),
      heure: minHours(initialInput.date),
    };
    setInputValue(cleanArray);
  }, [modalEditState]);

  const handleSowModal = async () => {
    await set_modal_editRdv(false);
  };

  const handleChangValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let cleanData = {
      ...inputValue,
      date: new Date(`${inputValue.date} ${inputValue.heure}`),
      updatedAt: new Date(),
    };

    try {
      await edit_rdv(authState.token, id, cleanData);
      await set_modal_editRdv(false);
    } catch (error) {}
  };

  return (
    <Modal
      toggle={handleSowModal}
      isOpen={modalEditState}
      modalClassName="modal-black"
    >
      <ModalHeader toggle={handleSowModal}>{nom}</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="p-3">
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input
                name="nom"
                id="nom"
                placeholder="Nom du rendez-vous"
                defaultValue={inputValue.nom}
                onChange={handleChangValue}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ville">Ville</Label>
              <Input
                name="ville"
                id="ville"
                placeholder="Lieu du rendez-vous"
                defaultValue={inputValue.ville}
                onChange={handleChangValue}
              />
            </FormGroup>
            <div className="form-row">
              <Col md="5">
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={inputValue.date}
                    placeholder="Date du rendez-vous"
                    onChange={handleChangValue}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="heure">Heure</Label>
                  <Input
                    name="heure"
                    id="heure"
                    placeholder="HH:MM"
                    defaultValue={inputValue.heure}
                    onChange={handleChangValue}
                    maxLength={5}
                    required
                  />
                </FormGroup>
              </Col>
            </div>

            <FormGroup>
              <Label for="description">Commentaire</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                defaultValue={inputValue.description}
                placeholder="Commentaire"
                onChange={handleChangValue}
              />
            </FormGroup>
            <Col className="col-3">
              <Label for="color">Couleur</Label>
              <Input
                type="color"
                name="color"
                id="color"
                defaultValue={inputValue.color}
                onChange={handleChangValue}
              />
            </Col>
          </div>
          <ModalFooter>
            <Row className="text-center mx-auto">
              <Button className="mx-auto btn-info">Mettre à jour</Button>
            </Row>
          </ModalFooter>
        </form>
      </ModalBody>
      <ModalFooter>
        <p className="text-muted p-3">
          {" "}
          {`Dernère modification le ${minDateMonth(
            inputValue.updatedAt
          )} à ${minHours(inputValue.updatedAt)}`}
        </p>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalEditState: state.modalStateReducer.editRDV,
  authState: state.AuthReducer,
  currentEvent: state.rdvReducer.currentData,
});

const mapDispatchToProps = { set_modal_editRdv, edit_rdv };

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditEvent);
