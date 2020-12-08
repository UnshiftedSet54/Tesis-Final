/* React importaciones */
import React from "react";

/* React Boostrap */
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import "../styles/PageStyles/register.css";

import { Link } from "react-router-dom";


const Register = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="card-contenedor">
        <Card className="card-details">
          <Card.Body>
            <Container>
              <Row>
                <Col md = {6} >
                  <h5 style={{ textAlign: "center" }}>
                    Quieres contratar a un profesional?
                  </h5>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button className = "btn-register" onClick = { () => props.history.push('/registro/empresa') } variant="success">Contrata un profesional</Button>{" "}
                  </div>
                </Col>
                <Col md = {6}>
                  <h5 style={{ textAlign: "center" }}>
                    Quieres trabajar como profesional?
                  </h5>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button className = "btn-register" onClick = { () =>  props.history.push('/registro/profesional') } variant="success">Se un profesional</Button>{" "}
                  </div>{" "}
                </Col>
              </Row>
              <hr />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <label style = {{  whiteSpace: "nowrap"}}>Ya estas registrado? </label>  <Link to = "/login" style = {{ marginLeft: '3px' }}>Ingresa</Link>
              </div>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;
