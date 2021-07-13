import React, { useState } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import "../components/DragBoard/Demarche.css";
import Column from "components/DragBoard/Column";
import { connect } from "react-redux";
import { getDataChecked } from "components/Utils/ArraySevices";
import { useEffect } from "react";
import { update_entreprise } from "redux/actions/entreprisesAction";

const DemarcheTable = ({
  loadlistEntreprise,
  listChecked,
  update_entreprise,
  token,
}) => {
  useEffect(() => {
    listChecked.map((list) => {
      let data = { statut: "prospected" };
    });
  }, [loadlistEntreprise]);

  const isMobile = window.innerWidth < 780;

  const returnColumn = (columnName) => {
    return listChecked
      .filter((item) => item.statut === columnName)
      .map((item) => (
        <MovableItem key={item.id} id={item.id} name={item.nom} />
      ));
  };

  const MovableItem = ({ id, name }) => {
    const changeItemColumn = (currentItem, columnName) => {
      listChecked.map(async (e) => {
        return {
          ...e,
          statut:
            e.id === currentItem.id
              ? await update_entreprise(token, id, {
                  statut: columnName,
                  updateAt: new Date(),
                })
              : await update_entreprise(token, id, {
                  statut: e.columnName,
                  updateAt: new Date(),
                }),
        };
      });
    };

    const [{ isDragging }, drag] = useDrag({
      item: { id, name, type: "BOX" },
      type: "BOX",

      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();

        if (dropResult) {
          const { name } = dropResult;
          switch (name) {
            case "prospected":
              changeItemColumn(item, "prospected");

              break;
            case "relance":
              changeItemColumn(item, "relance");

              break;
            case "entretien":
              changeItemColumn(item, "entretien");

              break;

            default:
              break;
          }
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.8 : 1;
    const cursor = isDragging ? "grabbing" : "grab";

    return (
      <li
        ref={drag}
        className="movable-item"
        style={{ opacity: opacity, cursor: cursor }}
      >
        <Card className="bg-info text-white">
          <CardBody>{name}</CardBody>
        </Card>
      </li>
    );
  };
  return (
    <>
      <div className="content">
        <Row>
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <Col sm={4} md={4}>
              <Column
                className="boardContainer border-top border-info "
                title="prospected"
              >
                {" "}
                <CardHeader>
                  <h3>Entreprises Postulé</h3>
                </CardHeader>
                <ul className="mt-3">{returnColumn("prospected")}</ul>
              </Column>
            </Col>
            <Col sm={4} md={4}>
              <Column
                className="boardContainer border-top border-warning"
                title="relance"
              >
                <CardHeader>
                  <h3>Mes Relances</h3>
                </CardHeader>
                <ul className="mt-3">{returnColumn("relance")}</ul>
              </Column>
            </Col>
            <Col sm={4} md={4}>
              <Column
                className="boardContainer border-top border-success"
                title="entretien"
              >
                <CardHeader>
                  <h3>Entretient</h3>
                </CardHeader>
                <ul className="mt-3">{returnColumn("entretien")}</ul>
              </Column>
            </Col>
          </DndProvider>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loadlistEntreprise: state.EntreprisesReducer.isLoading,
  listChecked: getDataChecked(state.EntreprisesReducer.dataCollection),
  token: state.AuthReducer.token,
});

const mapDispatchToProps = { update_entreprise };

export default connect(mapStateToProps, mapDispatchToProps)(DemarcheTable);
