/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { connect } from 'react-redux'

import { Button, ListGroup, Modal } from "react-bootstrap";

import { useParams } from "react-router-dom";

import NavBar from "../components/navBar";

import { getPropuestaByAnuncio } from '../actions/propuestaActions'

import "../styles/PageStyles/propuestaPage.css"

import { cleanUserInfo, getUserInfo } from "../actions/userInfoActions"

const PropuestaPage = ({ onGetByAnuncio, propuestas, onGetUserInfo, userInfo }) => {

    const [show, setShow] = useState(false)

  let { id } = useParams();

  useEffect(() => {

    onGetByAnuncio(id)

  }, [])

  useEffect(() => {

    if(userInfo !== null) {

    setShow(true)

    }

  }, [userInfo])

  const openModal = (v) => {

    onGetUserInfo(v.user_prop)


  }
  
  const renderList = () => {

    if (propuestas !== null) {

        return (
            <ListGroup className = "list-group-container">
                { propuestas.map(propuesta => {
                    return (
                        <ListGroup.Item style = {{ marginTop: '20px', width: '80%' }} className = "listgroup-description">
                            <h1 style = { { textAlign: 'center' } }>Descripcion</h1>
                            <div style = {{ marginBottom: '10px', marginTop: '20px' }}>
                            { propuesta.descripcion }    
                            </div>
                            <div className = "footer-container">
                            <label>Enviado por: { propuesta.user_prop } </label>
                            <Button onClick = {() => openModal(propuesta) } >Ver informacion de {propuesta.user_prop}</Button>
                            </div>
                        </ListGroup.Item>  
                    )
                })  }
            </ListGroup>
        )
    }
  }

  return (
    <div>
      <NavBar />
      {renderList()}


      <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

const mapStateToProps = (state) => {
    const {  propuesta, userInfo  } = state
    return {
        propuestas: propuesta.propuestaByAnuncio,
        userInfo: userInfo.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onGetByAnuncio: (id) => {
            dispatch(getPropuestaByAnuncio(id))
        },
        onGetUserInfo: (id) => {
            dispatch(getUserInfo(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PropuestaPage);
