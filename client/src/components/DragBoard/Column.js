import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { useDrop } from "react-dnd";
const Column = ({ children, className, title }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "BOX",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const bacground = isOver ? "rgba(39, 41, 61,0.3)" : "#27293d";

  return (
    <div ref={drop}>
      <Card style={{ backgroundColor: bacground }} className={className}>
        {children}
      </Card>
    </div>
  );
};

export default Column;
