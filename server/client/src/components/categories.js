/* React importaciones  */
import React, { useState, useLayoutEffect } from "react";

/* React boostrap */
import { Card } from "react-bootstrap";

/* CSS */
import "../styles/ComponentsStyles/Categories.css";

const Categories = ({ content }) => {

  return (
    <div>
      <Card className="card-style" style = {{ height: '300px' }}>
        <Card.Img variant="top" src = {content.src} className = "image" />
        <Card.Body>
          <Card.Title style = {{ textAlign : 'center' }}>{content.titulo}</Card.Title>
          <Card.Text style = {{ textAlign: 'center' }}>
            { content.contenido  }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Categories;
