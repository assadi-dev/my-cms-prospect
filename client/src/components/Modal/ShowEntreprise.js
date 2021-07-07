import { minTextDate } from "components/Utils/DateServices";
import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Button, Col, ModalBody, ModalFooter } from "reactstrap";
import {
  update_entreprise,
  get_current_entreprises,
} from "redux/actions/entreprisesAction";

const ShowEntreprise = ({
  update_entreprise,
  currentEntreprise,
  authState,
}) => {
  const {
    id,
    nom,
    secteur,
    adresse,
    ville,
    codePostal,
    description,
    telephone,
    email,
    siteWeb,
    createAt,
  } = currentEntreprise;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  return (
    isLoading === false && (
      <>
        <div className="p-2 ">
          <h2 className="card-title">{nom}</h2>
          <p className="card-subtitle">{secteur}</p>
          <div className="mt-3">
            <Row className="p-2">
              <p className="mx-1">{adresse}</p>
              <p className="mx-1">{ville}</p>
              <p className="mx-1">{codePostal}</p>
            </Row>

            <Row>
              {email && (
                <Col>
                  <a href={`mailto:${email}`} target="_blank">
                    <i className="tim-icons icon-email-85 mr-2" />
                    contacter par email
                  </a>
                </Col>
              )}
              {siteWeb && (
                <Col>
                  <a href={siteWeb} target="_blank" rel="noopener noreferrer">
                    <i className="tim-icons icon-link-72 mr-2" />
                    Site web
                  </a>
                </Col>
              )}
              {telephone && (
                <Col>
                  <a href={`tel:+${telephone}`}>
                    <i className="tim-icons icon-mobile mr-2" />
                    {`Appeler ${telephone}`}
                  </a>
                </Col>
              )}
            </Row>
          </div>
          <div className="mt-3">{description}</div>
        </div>
        <ModalFooter className="mt-3">
          <p className="text-muted">{`Crée le ${minTextDate(createAt)}`}</p>
        </ModalFooter>
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
  update_entreprise,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowEntreprise);
