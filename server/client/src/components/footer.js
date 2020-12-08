/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { Row, Col, Container, Form, Button } from "react-bootstrap";

import "../styles/ComponentsStyles/footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faInfo } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer-container">
        <Row>
          <Col lg = {4} sm = {6}>
            <div className="content-1">
              <label className="label-style">Contactanos</label>
              <label className="label-style">
                {" "}
                <FontAwesomeIcon
                  icon={faPhone}
                  color="white"
                  className="icon"
                />{" "}
                +58 4120055000
              </label>
              <label className="label-style">
                {" "}
                <FontAwesomeIcon
                  icon={faEnvelope}
                  color="white"
                  className="icon"
                />{" "}
                TuWork@gmail.com
              </label>
            </div>
          </Col>

          <Col lg = {4} sm = {6}>
            <div className="content-1">
              <label className="label-style">
                {" "}
                <FontAwesomeIcon
                  icon={faInfo}
                  color="white"
                  style={{ marginRight: "6px" }}
                />{" "}
                Sobre nosotros
              </label>
              <label className="label-style">
                Somos una empresa jkasnjkdnjadnasndjknasjkdnjasndjkaskdnas
              </label>
            </div>
          </Col>

          <Col lg = {4} sm = {6}>
            <div>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label style = {{ color: 'white' }}>Danos tu opninion</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
              <div className = "boton-container"> 
              <Button variant="success">Enviar</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-success footer-final">
        <label style={{ display: "block", textAlign: "center", color: 'white' }}>
          Copyright &copy; 2021. Todos los derechos reservados
        </label>
      </div>
    </footer>
  );
};

export default Footer;
