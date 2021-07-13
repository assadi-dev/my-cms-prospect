import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Button,
  Input,
  Modal,
  FormGroup,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { add_entreprise } from "redux/actions/entreprisesAction";
import { set_modal_addEntreprise } from "redux/actions/modalStateAction";

const ModalAddEntreprise = ({
  authState,
  add_entreprise,
  set_modal_addEntreprise,
  modalState,
}) => {
  const initialInput = {
    nom: "",
    secteur: "",
    adresse: "",
    ville: "",
    codePostal: "",
    description: "",
    checked: false,
    telephone: "",
    email: "",
    siteWeb: "",
    createAt: new Date(),
    updateAt: new Date(),
    userId: `/api/users/${authState.userId}`,
  };
  const [state, setState] = useState(initialInput);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        userId: `/api/users/${authState.userId}`,
      };
    });
  }, []);

  const handleChangValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const showAddEntrepriseModal = async () => {
    try {
      await set_modal_addEntreprise(!modalState);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setState((prevState) => {
      return {
        ...prevState,
        createAt: new Date(),
        updateAt: new Date(),
      };
    });

    await add_entreprise(authState.token, state);
    await set_modal_addEntreprise(false);
  };

  return (
    <>
      <Modal
        isOpen={modalState}
        modalClassName="modal-black"
        toggle={showAddEntrepriseModal}
      >
        <ModalHeader className="justify-content-center">
          <button
            type="button"
            className="close p-0"
            data-dismiss="modal"
            aria-label="Close"
            onClick={showAddEntrepriseModal}
          >
            <i className="tim-icons icon-simple-remove"></i>
          </button>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="p-3">
              <FormGroup>
                <Label for="nom">Nom</Label>
                <Input
                  name="nom"
                  id="nom"
                  placeholder="Nom de l'entreprise"
                  onChange={handleChangValue}
                />
              </FormGroup>
              <FormGroup>
                <Label for="secteur">Secteur Activité</Label>
                <Input
                  name="secteur"
                  id="secteur"
                  placeholder="Secteur Activité"
                  onChange={handleChangValue}
                />
              </FormGroup>
              <FormGroup>
                <Label for="adresse">Address</Label>
                <Input
                  name="adresse"
                  id="adresse"
                  placeholder="Address l'entreprise"
                  onChange={handleChangValue}
                />
              </FormGroup>
              <Row>
                <Col lg="7">
                  {" "}
                  <FormGroup>
                    <Label for="ville">Ville</Label>
                    <Input
                      name="ville"
                      id="ville"
                      placeholder="Ville"
                      onChange={handleChangValue}
                    />
                  </FormGroup>
                </Col>{" "}
                <Col lg="5">
                  <FormGroup>
                    <Label for="codePostal">Code Postal</Label>
                    <Input
                      name="codePostal"
                      id="codePostal"
                      placeholder="codePostal"
                      onChange={handleChangValue}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="5">
                  <FormGroup>
                    <Label for="examplePassword">Téléphone</Label>
                    <Input
                      type="tel"
                      name="telephone"
                      id="telephone"
                      placeholder="numéro de téléphone"
                      onChange={handleChangValue}
                    />
                  </FormGroup>
                </Col>
                <Col md="7">
                  <FormGroup>
                    <Label for="examplePassword">Adresse email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Adresse email"
                      onChange={handleChangValue}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label for="siteWeb">Site web</Label>
                <Input
                  type="url"
                  name="siteWeb"
                  id="siteWeb"
                  placeholder="Site web"
                  onChange={handleChangValue}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Commentaire</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Commentaire"
                  onChange={handleChangValue}
                />
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-center">
            <Button color="info" type="submit">
              Save changes
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.AuthReducer,
    modalState: state.modalStateReducer.addEntModalstate,
  };
};

const mapDispatchToProps = {
  add_entreprise,
  set_modal_addEntreprise,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddEntreprise);
