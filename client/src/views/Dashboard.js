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
import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import { Line, Bar } from "react-chartjs-2";
import { chartExample1, chartExample2 } from "variables/charts.js";
import ChartCard from "../components/Chart/ChartCard";

import { connect } from "react-redux";
import {
  minDateMonth,
  minDateMonthReverse,
  minHours,
} from "../components/Utils/DateServices";
import { get_entreprises } from "redux/actions/entreprisesAction";
import { get_rdv } from "redux/actions/rdvAction";
import { useState } from "react";

function Dashboard({
  listEntreprises,
  listRDV,
  token,
  get_entreprises,
  get_rdv,
}) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const [state, setState] = useState({
    isloading: true,
    entpriseLoad: listEntreprises.isLoading,
    rdvLoad: listRDV.isLoading,
    chartEntreprise: {},
  });

  useEffect(() => {
    (async () => {
      try {
        get_entreprises(token);
        get_rdv(token);

        setState((prevState) => {
          return {
            ...prevState,
            entpriseLoad: listEntreprises.isLoading,
          };
        });
      } catch (error) {}
    })();
  }, [dispatchEvent, listEntreprises.isLoading, listRDV.isLoading]);

  return (
    <>
      <div className="content">
        {/* <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Mes Démarches</h5>
                    <CardTitle tag="h2">Fréquences</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>*/}
        <Row>
          {!listEntreprises.isLoading && (
            <Col lg="6">
              <ChartCard
                titleChart="Entreprises enregistrées"
                rowLabel={["Prospecté", "Pas encore prospécté"]}
                data={listEntreprises.dataCollection}
                dataArrayTotal={listEntreprises.dataCollection.length}
              />
            </Col>
          )}
          {!listRDV.isLoading && (
            <Col lg="6">
              <ChartCard
                titleChart="Rendez-Vous enregistrées"
                rowLabel={["Terminé", "En attente"]}
                data={listRDV.dataCollection}
                dataArrayTotal={listRDV.dataCollection.length}
              />
            </Col>
          )}
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Entreprise ajoutées recement</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nom</th>
                      <th>Ville</th>
                      <th className="text-center">Statut</th>
                      <th>Ajouté le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listEntreprises.isLoading === false &&
                      listEntreprises.dataCollection.slice(0, 5).map((item) => (
                        <tr key={item.id}>
                          <td>{item.nom}</td>
                          <td>{item.ville}</td>
                          <td className="text-center">
                            {item.statut === "entretien" && (
                              <span className="text-success">Entretien</span>
                            )}
                            {item.statut === "prospected" && (
                              <span style={{ color: "var(--teal)" }}>
                                Prospecté
                              </span>
                            )}
                            {item.statut === "relance" && (
                              <span className="text-warning">Relancé</span>
                            )}
                            {item.statut === "non-retenue" && (
                              <span className="text-danger">Non retenue</span>
                            )}
                            {item.statut === "retenue" && (
                              <span className="text-success">Retenue</span>
                            )}
                            {item.checked === false && (
                              <span className="text-danger">Non prospecté</span>
                            )}
                          </td>
                          <td>{minDateMonthReverse(item.createAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Rendez-vous ajoutées recement</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nom</th>
                      <th>Ville</th>
                      <th>Date</th>
                      <th>Heure</th>
                      <th className="text-center">Statut</th>
                      <th>Ajouté le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRDV.isLoading === false &&
                      listRDV.dataCollection.slice(0, 5).map((item) => (
                        <tr key={item.id}>
                          <td>{item.nom}</td>
                          <td>{item.ville}</td>
                          <td>{minDateMonth(item.date)}</td>
                          <td>{minHours(item.date)}</td>
                          <td className="text-center">
                            {" "}
                            {item.checked ? (
                              <span className="text-success">Terminé</span>
                            ) : (
                              <span className="text-danger">En attente</span>
                            )}
                          </td>
                          <td>{minDateMonth(item.createdAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  listEntreprises: state.EntreprisesReducer,
  listRDV: state.rdvReducer,
  token: state.AuthReducer.token,
});

const mapDispatchToProps = {
  get_entreprises,
  get_rdv,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
