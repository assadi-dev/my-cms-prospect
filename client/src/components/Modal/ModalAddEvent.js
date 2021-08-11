import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button, Input, FormGroup, ModalFooter, Label } from "reactstrap";
import { set_modal_addRdv } from "redux/actions/modalStateAction";
import { add_rdv } from "redux/actions/rdvAction";

const ModalAddEvent = ({
  dateSelect,
  add_rdv,
  authState,
  set_modal_addRdv,
}) => {
  const dateRDV = dateSelect;
  const initialInput = {
    nom: "",
    ville: "",
    description: "",
    date: dateRDV,
    heure: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    checked: false,
    color: "#e14eca",
    userId: `/api/users/${authState.userId}`,
  };

  const [state, setState] = useState(initialInput);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        date: dateRDV,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await add_rdv(authState.token, state);
      await set_modal_addRdv(false);
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <FormGroup>
            <Label for="nom">Nom</Label>
            <Input
              name="nom"
              id="nom"
              placeholder="Nom du rendez-vous"
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
              onChange={handleChangValue}
            />
          </FormGroup>
          <div className="form-row">
            <Col md="4">
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="datetime"
                  name="date"
                  id="date"
                  placeholder="Date du rendez-vous"
                  value={dateRDV}
                  onChange={handleChangValue}
                  disabled={true}
                  style={{ color: "#fff" }}
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
              defaultValue={state.color}
              onChange={handleChangValue}
            />
          </Col>
        </div>
        <ModalFooter className="justify-content-center">
          <Button color="info" type="submit">
            Save changes
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});

const mapDispatchToProps = {
  add_rdv,
  set_modal_addRdv,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddEvent);
