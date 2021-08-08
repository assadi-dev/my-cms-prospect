/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import RowTableEntreprise from "components/Table/RowTableEntreprise";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  FormGroup,
} from "reactstrap";
import { get_entreprises } from "../redux/actions/entreprisesAction";

import ModalAddEntreprise from "../components/Modal/ModalAddEntreprise";
import { set_modal_addEntreprise } from "redux/actions/modalStateAction";

function Tables({
  listEntreprise,
  get_entreprises,
  set_modal_addEntreprise,
  modalState,
}) {
  const [state, setState] = useState({
    focused: "",
    addModalEntreprise: false,
    isloading: true,
    searchTerm: "",
    statutFilter: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setState((prevState) => {
          return {
            ...prevState,
            isloading: listEntreprise.isLoading,
          };
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [listEntreprise.isLoading]);

  const onFocus = () => {
    setState((prevState) => {
      return { ...prevState, focused: "input-group-focus" };
    });
  };
  const onBlur = () => {
    setState((prevState) => {
      return { ...prevState, focused: "" };
    });
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        searchTerm: value,
      };
    });
  };

  const handleSatutFilter = (e) => {
    let value = e.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        statutFilter: value,
      };
    });
  };

  const showAddEntrepriseModal = async () => {
    try {
      await set_modal_addEntreprise(!modalState);
    } catch (error) {}
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Mes Entreprises</CardTitle>
              </CardHeader>
              <CardBody>
                <Row
                  style={{
                    justifyContent: "space-between",
                    alignContent: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Col md="5" className="d-flex justify-content-center my-3">
                    <Button
                      color="info"
                      style={{ display: "flex" }}
                      onClick={showAddEntrepriseModal}
                    >
                      <i className="tim-icons icon-simple-add mr-2" />{" "}
                      <span>Entreprise</span>
                    </Button>
                  </Col>
                  <Col md="5" className="my-3">
                    <InputGroup className={state.focused}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-zoom-split" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Rechercher une entreprise"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleSearch}
                      />
                    </InputGroup>
                  </Col>
                  <Col md="3" className="my-3">
                    <FormGroup>
                      <Label for="statutFilter">Statut</Label>
                      <Input
                        type="select"
                        name="select"
                        id="statutFilter"
                        onChange={handleSatutFilter}
                      >
                        <option value="">Tout</option>
                        <option value="no-prospected">Non-prospecté</option>
                        <option value="prospected">Prospecté</option>
                        <option value="relance">Relancé</option>
                        <option value="entretient">Entretient</option>
                        <option value="retenue">Retenue</option>
                        <option value="non-retenue">Non-retenue</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th></th>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Ville</th>
                      <th className="text-left">Téléphone</th>
                      <th className="text-center">Statut</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listEntreprise.dataCollection
                      .filter((item) => {
                        return (
                          (item.nom
                            .toLowerCase()
                            .includes(state.searchTerm.toLowerCase()) ||
                            item.email
                              .toLowerCase()
                              .includes(state.searchTerm.toLowerCase()) ||
                            item.ville
                              .toLowerCase()
                              .includes(state.searchTerm.toLowerCase()) ||
                            item.codePostal
                              .toLowerCase()
                              .includes(state.searchTerm.toLowerCase())) &&
                          item.statut.startsWith(state.statutFilter)
                        );
                      })
                      .map((item) => (
                        <RowTableEntreprise key={item.id} data={item} />
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ModalAddEntreprise />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    listEntreprise: state.EntreprisesReducer,
    AuthState: state.AuthReducer,
    modalState: state.modalStateReducer.addEntModalstate,
  };
};

const mapDispatchToProps = {
  get_entreprises,
  set_modal_addEntreprise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
