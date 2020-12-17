/* React importaciones */
import React, { useState, useEffect, useLayoutEffect, useParams } from "react";

import { connect } from "react-redux";

import NavBar from "../components/navBar";

import { getPropuestas } from "../actions/propuestaActions";

import { Button, ListGroup, Modal, Badge } from "react-bootstrap";

import "../styles/PageStyles/userPropuestas.css"

const UserPropuestas = ({ auth, onGetPropuesta, propuestas }) => {
  useEffect(() => {
    onGetPropuesta(auth.username_freelancer);
  }, []);

  const renderList = () => {
    if (propuestas !== null) {
      console.log("PROPIESTAS", propuestas);

      return (
        <ListGroup>
          {propuestas.map((v) => (
            <ListGroup.Item>
              <div className="propuestas-container">
                <div>
                  <h3>{v.descripcion}</h3>
                  <label>Enviado a: {v.username_freelancer}</label>
                </div>
                <div className = "bagde-container">
                { v.isread ? <Badge style = {{  height: '20px', marginRight: '50px' }} variant="success">Leido</Badge> : <Badge style = {{ height: '20px', marginRight: '50px' }} variant="warning">No leido</Badge> }
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  };

  return (
    <div>
      <NavBar />
      {renderList()}
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
    onGetPropuesta: (id) => {
      dispatch(getPropuestas(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPropuestas);
