import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const SecondColumn = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "BOX",
    drop: () => ({ name: "some name" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  console.log("option", { canDrop, isOver });
  return (
    <>
      <Col md="3">
        <Card
          className="boardContainer border-top border-warning"
          style={{
            backgroundColor: isOver ? "rgba(39, 41, 61,0.5)" : "#27293d",
          }}
        >
          <CardHeader>
            <h3>Mes Relances</h3>
          </CardHeader>
          <ul ref={drop} className="mt-3">
            {canDrop ? "Release to drop" : "Drag a box here"}
          </ul>
        </Card>
      </Col>
    </>
  );
};

export default SecondColumn;
