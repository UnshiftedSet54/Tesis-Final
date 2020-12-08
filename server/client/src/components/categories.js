/* React importaciones  */
import React, { useState, useLayoutEffect } from "react";

/* React boostrap */
import { Card } from "react-bootstrap";

/* CSS */
import "../styles/ComponentsStyles/Categories.css";

const Categories = ({ content }) => {
  const cardSelected = () => {
    console.log("Contendio del card", content);
  };

  return (
    <div>
      <Card className="card-style" onClick={() => cardSelected(content)}>
        <Card.Img variant="top" src = {content.src} className = "image" />
        <Card.Body>
          <Card.Title style = {{ textAlign : 'center' }}>{content.titulo}</Card.Title>
          <Card.Text>
            asnjksdnsjkddjkbjkasbdjkbasdbasjkdbasdbjkabjdbvfyuv
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Categories;
