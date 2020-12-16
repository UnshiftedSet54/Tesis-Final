/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { connect } from "react-redux";

import { Button, ListGroup, Modal } from "react-bootstrap";

import { useParams } from "react-router-dom";

import NavBar from "../components/navBar";

import { getPropuestaByAnuncio, updatePropuesta, cleanUpdate } from "../actions/propuestaActions";

import "../styles/PageStyles/propuestaPage.css";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { cleanUserInfo, getUserInfo } from "../actions/userInfoActions";

const PropuestaPage = ({
  onGetByAnuncio,
  propuestas,
  onGetUserInfo,
  userInfo,
  onCleanUserInfo,
  onUpdatePropuesta,
  isUpdated,
  onCleanUpdate
}) => {
  const [show, setShow] = useState(false);

  const [v, setV] = useState("")

  let { id } = useParams();

  useEffect(() => {
    onGetByAnuncio(id);
  }, []);

  useEffect(() => {
    if (userInfo !== null) {
      setShow(true);
    }
  }, [userInfo]);

  useEffect(() => {
    if(isUpdated) {
      onGetUserInfo(v.user_prop);
      onCleanUpdate()
    }
  }, [isUpdated, v])

  const openModal = (v) => {
    setV(v)
    onUpdatePropuesta(v.propuesta_id)
  };

  const cleanUserInfo = () => {
    setShow(false)
    onCleanUserInfo()
      
  }

  const renderModal = () => {
    if (show) {
      return (
        <Modal show={show} onHide={() => cleanUserInfo()}>
          <Modal.Header closeButton>
            <h3 style={{ textAlign: "center", display: "inline" }}>
              Informacion de {userInfo.username_freelancer}
            </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="flex-container">
              <div className="flex-child-container">
                <h4> Nombre: {userInfo.username_nombre}</h4>
                <h4> Estado: {userInfo.estado}</h4>
              </div>
              <div className = "flex-download">
                Descargar curriculum
                <div>
                  <a
                    style={{ color: "black" }}
                    download="FileName"
                    href={userInfo.pdf_url}
                  >
                    <FontAwesomeIcon
                      style={{ marginLeft: "8px" }}
                      icon={faDownload}
                    />
                  </a>
                </div>
              </div>
            </div>
            <h4 style={{ textAlign: "center", marginTop: "20px" }}>
              Areas que maneja {userInfo.username_nombre}
            </h4>
            <ListGroup>
              {userInfo.area_info.map((area) => {
                return (
                  <ListGroup.Item>
                    <label style={{ display: "block" }}>
                      Area: {area.nombre_area}
                    </label>
                    <label>Experiencia: {area.experiencia}</label>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Guardar en favoritos</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  const renderList = () => {
    if (propuestas !== null) {
      return (
        <ListGroup className="list-group-container">
          {propuestas.map((propuesta) => {
            return (
              <ListGroup.Item
                style={{ marginTop: "20px", width: "80%" }}
                className="listgroup-description"
              >
                <h1 style={{ textAlign: "center" }}>Descripcion</h1>
                <div style={{ marginBottom: "10px", marginTop: "20px" }}>
                  {propuesta.descripcion}
                </div>
                <div className="footer-container">
                  <label>Enviado por: {propuesta.user_prop} </label>
                  <Button onClick={() => openModal(propuesta)}>
                    Ver informacion de {propuesta.user_prop}
                  </Button>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    }
  };

  return (
    <div>
      <NavBar />
      {renderList()}

      {renderModal()}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { propuesta, userInfo } = state;
  return {
    isUpdated: propuesta.updated,
    propuestas: propuesta.propuestaByAnuncio,
    userInfo: userInfo.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetByAnuncio: (id) => {
      dispatch(getPropuestaByAnuncio(id));
    },
    onGetUserInfo: (id) => {
      dispatch(getUserInfo(id));
    },
    onCleanUserInfo: () => {
      dispatch(cleanUserInfo())
    },
    onUpdatePropuesta: (id) => {
      dispatch(updatePropuesta(id))
    },
    onCleanUpdate: () => {
      dispatch(cleanUpdate())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropuestaPage);
