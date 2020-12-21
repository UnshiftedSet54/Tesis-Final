/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import {  connect } from 'react-redux'

import { getUserInfoLogged, updateUrl  } from "../actions/userInfoActions"

import { Container, Col, Row, Button, Form, Dropdown } from "react-bootstrap";

import { storage } from "../firebase/index"


const MiCuenta = ({ onGetInfoUserLogged, auth, userInfo, onUpdateUrl }) => {

  const [isEditMode, setIsEditMode] = useState(false)

  const [pdf, setPdf] = useState('')

  const [states, setStates] = useState([
    "Amazonas",
    "Anzoategui",
    "Aragua",
    "Barinas",
    "Bolivar",
    "Carabobo",
    "Cojedes",
    "Delta Amacuro",
    "Distrito Capital",
    "Falcon",
    "Guarico",
    "Lara",
    "Merida",
    "Miranda",
    "Monagas",
    "Nueva Esparta",
    "Portuguesa",
    "Sucre",
    "Tachira",
    "Trujillo",
    "La Guaira",
    "Yaracuy",
    "Zulia"
    ]);

    const [selectedState, setSelectedState] = useState('')
  
  useEffect(() => {

    if (auth.user !== undefined) {
      onGetInfoUserLogged()
      setSelectedState(userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.estado : null)
    }
  }, []  )

  const uploadFile = (file) => {

    setPdf(file[0])

  }


  const guardarPdf =  async () => {

    const updateTask = storage.refFromURL(userInfo.userLoggedInfo.result.pdf_url)

    const uploadTask = storage.ref(`pdf/${auth.username_freelancer}${pdf.name}`).put(pdf);

    updateTask.delete().then(valor => {
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref("pdf")
            .child(auth.username_freelancer+pdf.name)
            .getDownloadURL()
            .then( async newUrl => {
              console.log("NEW URL", newUrl)
              onUpdateUrl(newUrl)
            })
        }
      )
    })
  }

  const renderItems = () => {

    if(isEditMode) {
      return (
        <div>
          <input type = "file" onChange = { (e) => uploadFile(e.target.files)  } /> 
          <Button onClick = { () => setIsEditMode(false) } >Quitar modo editable</Button>
          {  pdf === "" ? null : <Button onClick = { () => guardarPdf() } >Guardar</Button>   }
        </div>
      )
    } else {
      return(
        <div>
          <a href = { userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.pdf_url : null  } target="_blank" ><Button>Ver PDF</Button></a>
          <Button onClick = { () => setIsEditMode(true) } >Editar</Button>
        </div>
        )
    }

  }

  return (
    <div>
      <Row style = {{ marginRight: '0px', marginLeft: '0px' }}>
        <Col lg = {7} style = {{ padding: '0' }}>
          <h1 style = {{ textAlign: 'center' }}>Informacion de cuenta</h1>

          <Form.Label>Usuario</Form.Label>
          <Form.Control value = {  userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.username_freelancer : null } />

          <Form.Label>Nombre</Form.Label>
          <Form.Control value = {  userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.username_nombre : null } />

          <Dropdown drop="up" style={{ marginBottom: "10px", width: "100%" }}>
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="success"
                id="dropdown-basic"
              >
                { selectedState }
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%"}} className = "dropdown-register">
                
                {states.map((value) => (
                  <Dropdown.Item onClick={() => setSelectedState(value)}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

          { renderItems() }

        </Col>
        <Col lg = {5} style = {{ padding: '0' }}>
          <h1 style = {{ textAlign: 'center' }}>Estadisticas</h1>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {

  const { auth, userInfo  } = state

    return {
      auth,
      userInfo
    }
}

const mapDispatchToProps = (dispatch) => {

  return {
    onGetInfoUserLogged: () => {
      dispatch(getUserInfoLogged())
    },
    onUpdateUrl: (newUrl) => {
      dispatch(updateUrl(newUrl))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (MiCuenta)