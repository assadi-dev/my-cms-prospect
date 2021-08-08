import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import "../components/DragBoard/Demarche.css";
import Column from "components/DragBoard/Column";
import { connect } from "react-redux";
import { getDataChecked } from "components/Utils/ArraySevices";
import { useEffect } from "react";
import { update_entreprise } from "redux/actions/entreprisesAction";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DemarcheTable = ({
  loadlistEntreprise,
  listChecked,
  update_entreprise,
  token,
}) => {
  const [listData, setListData] = useState(listChecked);

  const ondragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    const start = listData.filter(
      (column) => column.statut === source.droppableId
    );

    const finish = listData.filter(
      (column) => column.statut === destination.droppableId
    );
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (start === finish) {
      return;
    }

    const newState = [
      ...listData.map((item) => {
        if (item.id == draggableId) {
          return { ...item, statut: destination.droppableId };
        }
        return item;
      }),
    ];
    await setListData(newState);
    await update_entreprise(token, draggableId, {
      statut: destination.droppableId,
      updateAt: new Date(),
    });
  };

  const isMobile = window.innerWidth < 780;

  const returnColumn = (columnName) => {
    return listData
      .filter((item) => item.statut === columnName)
      .map((item, index) => (
        <MovableItem key={item.id} id={item.id} name={item.nom} index={index} />
      ));
  };

  const MovableItem = ({ id, name, index }) => {
    return (
      <Draggable draggableId={id.toString()} index={index}>
        {(provider) => (
          <li
            {...provider.dragHandleProps}
            {...provider.draggableProps}
            ref={provider.innerRef}
          >
            <Card className="bg-info text-white">
              <CardBody>{name}</CardBody>
            </Card>
          </li>
        )}
      </Draggable>
    );
  };
  return (
    <>
      <div className="content">
        <div className="d-flex" style={{ overflowX: "auto" }}>
          <DragDropContext onDragEnd={ondragEnd}>
            <Col sm={3} md={3}>
              <Column
                className="boardContainer border-top border-info "
                title="prospected"
              >
                {" "}
                <CardHeader>
                  <h3>Entreprises Postulé</h3>
                </CardHeader>
                <Droppable droppableId={"prospected"}>
                  {(provider, snapshot) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <ul className="mt-3">{returnColumn("prospected")}</ul>
                      {provider.placeholder}
                    </div>
                  )}
                </Droppable>
              </Column>
            </Col>
            <Col sm={3} md={3}>
              <Column
                className="boardContainer border-top border-warning"
                title="relance"
              >
                <CardHeader>
                  <h3>Mes Relances</h3>
                </CardHeader>
                <Droppable droppableId={"relance"}>
                  {(provider) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <ul className="mt-3">{returnColumn("relance")}</ul>
                      {provider.placeholder}
                    </div>
                  )}
                </Droppable>
              </Column>
            </Col>
            <Col sm={3} md={3}>
              <Column
                className="boardContainer border-top border-success"
                title="entretien"
              >
                <CardHeader>
                  <h3>Entretient</h3>
                </CardHeader>

                <Droppable droppableId={"entretien"}>
                  {(provider) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <ul className="mt-3">{returnColumn("entretien")}</ul>
                      {provider.placeholder}
                    </div>
                  )}
                </Droppable>
              </Column>
            </Col>
            <Col sm={3} md={3}>
              <Column
                className="boardContainer border-top border-success"
                title="retenue"
              >
                <CardHeader>
                  <h3>Retenue</h3>
                </CardHeader>

                <Droppable droppableId={"retenue"}>
                  {(provider) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <ul className="mt-3">{returnColumn("retenue")}</ul>
                      {provider.placeholder}
                    </div>
                  )}
                </Droppable>
              </Column>
            </Col>
            <Col sm={3} md={3}>
              <Column
                className="boardContainer border-top border-danger"
                title="non-retenue"
              >
                <CardHeader>
                  <h3>Non-retenue</h3>
                </CardHeader>

                <Droppable droppableId={"non-retenue"}>
                  {(provider) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <ul className="mt-3">{returnColumn("non-retenue")}</ul>
                      {provider.placeholder}
                    </div>
                  )}
                </Droppable>
              </Column>
            </Col>
          </DragDropContext>
        </div>
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
