/* React importaciones */
import React, { useState, useEffect, useLayoutEffect, useParams } from "react";

import { connect } from "react-redux";

import NavBar from "../components/navBar";

import { getPropuestas } from "../actions/propuestaActions";

import { Button, ListGroup, Modal, Badge, Spinner } from "react-bootstrap";

import "../styles/PageStyles/userPropuestas.css";

const UserPropuestas = ({ auth, onGetPropuesta, propuestas }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onGetPropuesta(auth.username_freelancer, setIsLoading);
  }, []);

  const renderList = () => {
    if (propuestas !== null) {
      if (!isLoading) {
        if (propuestas.length > 0) {
          return (
            <ListGroup>
              {propuestas.map((v, i) => (
                <ListGroup.Item key = {i}>
                  <div className="propuestas-container">
                    <div>
                      <h3>{v.descripcion}</h3>
                      <label>Enviado a: {v.username_freelancer}</label>
                    </div>
                    <div className="bagde-container">
                      {v.isread ? (
                        <Badge
                          style={{ height: "20px", marginRight: "50px" }}
                          variant="success"
                        >
                          Leido
                        </Badge>
                      ) : (
                        <Badge
                          style={{ height: "20px", marginRight: "50px" }}
                          variant="warning"
                        >
                          No leido
                        </Badge>
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          );
        } else {
          return (
          <div style = {{ height: '100%' }}>
            <div style = {{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'  }}>
              <h1>No tienes propuestas</h1>
            </div>
          </div>
          )
        }
      }
    }
  };

  return (
    <div className="contenido-page" style={{ height: "100vh" }}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <NavBar />

        { isLoading ? (
          <div style={{ height: "100%", backgroundColor: '#F0F1F1' }} >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{ width: "5rem", height: "5rem" }}
              />
              <h1>Cargando....</h1>
            </div>
          </div>

        ) : null }
        {renderList()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth, propuesta } = state;

  return {
    auth: auth.user,
    propuestas: propuesta.propuestasByUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPropuesta: (id, callbackFunction) => {
      dispatch(getPropuestas(id, callbackFunction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPropuestas);
