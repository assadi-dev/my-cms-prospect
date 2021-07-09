import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";

const FirstColumn = ({ item }) => {
  return (
    <>
      <Col md="3">
        <Card className="boardContainer border-top border-info">
          <CardHeader>
            <h3>Entreprises Postulé</h3>
          </CardHeader>
          <ul className="mt-3">{item}</ul>
        </Card>
      </Col>
    </>
  );
};

export default FirstColumn;
