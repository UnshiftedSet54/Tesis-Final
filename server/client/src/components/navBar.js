/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* React boostrap */
import {
  Navbar,
  Nav,
  Button,
  Overlay,
  OverlayTrigger,
  Popover,
  Container,
  Col,
  Row,
  Badge
} from "react-bootstrap";

/* Router */
import { Link } from "react-router-dom";

import { logOut } from "../actions/authAction";

const Navigation = ({ type, auth, onLogOut, anuncios }) => {
  const logOut = () => {
    onLogOut();
  };

  const renderName = () => {
    if (auth.user !== null) {
        return auth.user.username_freelancer
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title style={{ textAlign: "center" }} as="h3">
        {renderName()}
      </Popover.Title>
      <Popover.Content>
        <Container>
          <Row>
            <Col>
              {" "}
              <Link to="/micuenta"> Mi cuenta</Link>
            </Col>
          </Row>
          <hr />
          <Row>
            <label
              style={{ width: "100%", textAlign: "center" }}
              onClick={() => logOut()}
            >
              Cerrar Sesion
            </label>
          </Row>
        </Container>
      </Popover.Content>
    </Popover>
  );

  const render = () => {
    if (type === "home") {
      return (
        <Navbar className="bg-success">
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Item style={{ marginRight: "50px" }}>
                <Button variant="success">
                  {" "}
                  <Link to="/login" style={{ color: "white" }}>
                    Iniciar Sesion
                  </Link>
                </Button>
              </Nav.Item>
              <Nav.Item>
                <Button
                  style={{ borderColor: "black", borderWidth: "2px" }}
                  variant="success"
                >
                  {" "}
                  <Link to="/registro" style={{ color: "white" }}>
                    Registrarse
                  </Link>
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar className="bg-success">
          <Navbar.Collapse>
            <Nav>
              {  auth.user.isbussines ? (
              <Nav.Item>
                <Button variant="success">
                  {" "}
                  <Link to="/mispublicaciones" style={{ color: "white" }}>
                    Mis publicaciones
                    <Badge variant = "light" style = {{ marginLeft: '5px' }}>{ anuncios }</Badge>
                  </Link>
                </Button>
              </Nav.Item>
              ) : (
                <Nav.Item>
                <Button variant="success">
                  {" "}
                  <Link to="/usuariopropuestas" style={{ color: "white" }}>
                    Mis Propuestas
                  </Link>
                </Button>
              </Nav.Item>
              )  }

              <Nav.Item>
                <Button variant="success">
                  {" "}
                  <Link to="/misproyectos" style={{ color: "white" }}>
                    Mis Proyectos
                  </Link>
                </Button>
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav style={{ marginRight: "100px" }}>
              <Nav.Item style={{ marginRight: "50px" }}>
                <Button variant="success">
                  {" "}
                  <Link to="/login" style={{ color: "white" }}>
                    Conversaciones
                  </Link>
                </Button>
              </Nav.Item>
              <Nav.Item>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <Button variant="success">
                    {" "}
                    {/* <Link to="/registro" style={{ color: "white" }}> */}
                    Cuenta
                    {/* </Link> */}
                  </Button>
                </OverlayTrigger>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  };

  return <div>{render()}</div>;
};

const mapStateToProps = (state) => {
  const { auth, anuncios } = state;

  return {
    auth,
    anuncios: anuncios.notificationsPropuestas
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: (history) => {
      dispatch(logOut(history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
