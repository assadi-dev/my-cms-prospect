import React from "react";
import { Card } from "reactstrap";

const Column = ({ children, className, title, isOver }) => {
  const bacground = isOver ? "rgba(39, 41, 61,0.3)" : "#27293d";

  return (
    <Card style={{ backgroundColor: "#27293d" }} className={className}>
      {children}
    </Card>
  );
};

export default Column;
