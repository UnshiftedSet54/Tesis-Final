/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { connect } from "react-redux";

import { Button, ListGroup, Modal, Badge } from "react-bootstrap";

import { useParams } from "react-router-dom";

import NavBar from "../components/navBar";

import { getPropuestaByAnuncio, updatePropuesta, cleanUpdate, cleanPropuestaByAnuncio } from "../actions/propuestaActions";

import "../styles/PageStyles/propuestaPage.css";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { cleanUserInfo, getUserInfo } from "../actions/userInfoActions";
import { changeNotification } from "../actions/anunciosActions";
import { createChat } from "../actions/chatActions"


const PropuestaPage = ({
  onGetByAnuncio,
  propuestas,
  onGetUserInfo,
  userInfo,
  onCleanUserInfo,
  onUpdatePropuesta,
  isUpdated,
  onCleanUpdate,
  onChangeNotification,
  onCleanPropuestaByAnuncio,
  history,
  onCreateChat,
  chat
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

  useEffect(() => {
      return () => {
        onCleanPropuestaByAnuncio()
      }
  }, [])

  useEffect(() => {

    if(chat !== null) {
      history.push(`/chat/${chat}`) 
    }
  }, [chat])
  
  const openModal = (v) => {
    setV(v)
    onUpdatePropuesta(v.propuesta_id)
  };

  const cleanUserInfo = () => {
    setShow(false)
    onCleanUserInfo()
    
    const check = propuestas.find(v => v.user_prop ===  userInfo.username_freelancer).isread
    
    if(!check) {
      onChangeNotification()
    }

    onGetByAnuncio(id);
  }

  const createChat = () => {

    /* En el back ya está el usuario logeado */
    onCreateChat({
      username_freelancer_two: userInfo.username_freelancer
    })

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
            <Button variant = "primary" onClick = { () => createChat() }>Iniciar Conversacion</Button>
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
                <div className = "description-container">

                <div style={{ marginBottom: "10px", marginTop: "20px" }}>
                  {propuesta.descripcion}
                </div>

                <div style = {{ marginRight: '40px' }}>
                  { propuesta.isread ? <Badge style = {{ padding: '5px' }} variant="success">Leido</Badge> : <Badge style = {{ padding: '5px' }} variant="warning">No leido</Badge>  }
                </div>

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
  const { propuesta, userInfo, chat } = state;
  return {
    isUpdated: propuesta.updated,
    propuestas: propuesta.propuestaByAnuncio,
    userInfo: userInfo.userInfo,
    chat: chat.chatId
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
    },
    onChangeNotification: () => {
      dispatch(changeNotification())
    },
    onCleanPropuestaByAnuncio: () => {
      dispatch(cleanPropuestaByAnuncio())
    },
    onCreateChat: (info) => {
      dispatch(createChat(info))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropuestaPage);
