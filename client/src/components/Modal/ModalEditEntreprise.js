import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
} from "reactstrap";
import { update_entreprise } from "redux/actions/entreprisesAction";
import { get_current_entreprises } from "redux/actions/entreprisesAction";
import { set_modal_editEntreprise } from "../../redux/actions/modalStateAction";
import { minDateMonth, minHours } from "../Utils/DateServices";
import ShowEntreprise from "./ShowEntreprise";

const ModalEditEntreprise = ({
  modalState,
  set_modal_editEntreprise,
  currentEntreprise,
  authState,
  update_entreprise,
}) => {
  const {
    id,
    nom,
    source,
    secteur,
    adresse,
    ville,
    codePostal,
    description,
    telephone,
    email,
    siteWeb,
    updateAt,
  } = currentEntreprise;

  const sourceData = source && JSON.parse(source);
  const initialInput = {
    nom: nom,
    source: {
      source_name: source && sourceData.source_name,
      source_link: source && sourceData.source_link,
    },
    secteur: secteur,
    adresse: adresse,
    ville: ville,
    codePostal: codePostal,
    description: description,
    telephone: telephone,
    email: email,
    siteWeb: siteWeb,
    updateAt: updateAt,
    userId: `/api/users/${authState.userId}`,
  };
  const [inputValue, setInputValue] = useState(initialInput);

  const [editMode, setEdiMode] = useState(false);

  useEffect(() => {
    (async () => {
      await setInputValue(initialInput);
    })();
  }, [modalState]);

  const showEdditEntrepriseModal = async () => {
    try {
      await set_modal_editEntreprise(!modalState);
      setEdiMode(false);
    } catch (error) {}
  };

  const handleChangeValue = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    await setInputValue((prevState) => {
      return { ...prevState, [name]: value, updateAt: new Date() };
    });
  };
  const handleSourceValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputValue({
      ...inputValue,
      source: { ...inputValue.source, [name]: value, updateAt: new Date() },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setInputValue((prevState) => {
      return {
        ...prevState,
        updateAt: new Date(),
      };
    });

    await update_entreprise(authState.token, id, inputValue);
    await set_modal_editEntreprise(false);
    setEdiMode(false);
  };

  const handleEditMode = () => {
    setEdiMode(!editMode);
  };

  return (
    modalState === true && (
      <>
        <Modal
          modalClassName="modal-black"
          isOpen={modalState}
          toggle={showEdditEntrepriseModal}
          size="lg"
        >
          <ModalHeader
            className="justify-content-center"
            toggle={showEdditEntrepriseModal}
          >
            <span className="modal-title">{editMode && nom}</span>
          </ModalHeader>
          <div className="mb-3 text-center">
            <Button
              className="btn-link btn-warning mx-auto"
              onClick={handleEditMode}
            >
              {" "}
              <i className="tim-icons icon-pencil mr-1" />{" "}
              {editMode ? "Annuler la modification" : "Modifier"}
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <ModalBody>
              {!editMode && <ShowEntreprise />}
              {editMode && (
                <div className="content">
                  <div className="form-row">
                    <FormGroup className="col-md">
                      <Label for="nom">nom de L'entreprise</Label>
                      <Input
                        name="nom"
                        id="nom"
                        defaultValue={inputValue.nom}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                    <FormGroup className="col-md">
                      <Label for="secteur">Secteur Activit??</Label>
                      <Input
                        name="secteur"
                        id="secteur"
                        defaultValue={inputValue.secteur}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                    <FormGroup className="col-md">
                      <Label for="email">Adresse email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={inputValue.email}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                  </div>
                  <div className="form-row ">
                    <FormGroup className="col-md">
                      <Label for="adresse">Address</Label>
                      <Input
                        name="adresse"
                        id="adresse"
                        defaultValue={inputValue.adresse}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                    <FormGroup className="col-md">
                      <Label for="ville">Ville</Label>
                      <Input
                        name="ville"
                        id="ville"
                        defaultValue={ville}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                    <FormGroup className="col-md">
                      <Label for="codePostal">Code Postal</Label>
                      <Input
                        name="codePostal"
                        id="codePostal"
                        defaultValue={inputValue.codePostal}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                  </div>
                  <div className="form-row ">
                    <FormGroup className="col-md-5">
                      <Label for="telephone">T??l??phone</Label>
                      <Input
                        type="tel"
                        name="telephone"
                        id="telephone"
                        defaultValue={inputValue.telephone}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                    <FormGroup className="col-md">
                      <Label for="siteWeb">Site internet</Label>
                      <Input
                        type="url"
                        name="siteWeb"
                        id="siteWeb"
                        defaultValue={inputValue.siteWeb}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                  </div>
                  <Row className="my-3">
                    <Col lg="5">
                      {" "}
                      <FormGroup>
                        <Label for="source_name">Source de l'annonce</Label>
                        <Input
                          name="source_name"
                          id="source_name"
                          defaultValue={inputValue.source.source_name}
                          onChange={handleSourceValue}
                        />
                      </FormGroup>
                    </Col>{" "}
                    <Col lg="6">
                      <FormGroup>
                        <Label for="source_link">liens</Label>
                        <Input
                          name="source_link"
                          id="source_link"
                          defaultValue={inputValue.source.source_link}
                          onChange={handleSourceValue}
                          type="url"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <FormGroup className="col-md">
                      <Label for="description">Commentaire</Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        defaultValue={inputValue.description}
                        onChange={handleChangeValue}
                      />
                    </FormGroup>
                  </Row>
                  <Row className="my-3">
                    <span className="text-muted">
                      {"Derniere modification le " +
                        minDateMonth(updateAt) +
                        " ?? " +
                        minHours(updateAt)}{" "}
                    </span>
                  </Row>
                  <Row>
                    <Button className="btn-info mx-auto">Mettre ?? jour</Button>
                  </Row>
                </div>
              )}
            </ModalBody>
          </form>
        </Modal>
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    currentEntreprise: state.EntreprisesReducer.currentData,
    authState: state.AuthReducer,
    modalState: state.modalStateReducer.editEntModalstate,
  };
};

const mapDispatchToProps = {
  set_modal_editEntreprise,
  get_current_entreprises,
  update_entreprise,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEditEntreprise);
