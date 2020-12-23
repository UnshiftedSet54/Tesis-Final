/* React importaciones */
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import {  connect } from 'react-redux'

import { getUserInfoLogged, updateUrl  } from "../actions/userInfoActions"

import { Container, Col, Row, Button, Form, Dropdown, Card } from "react-bootstrap";

import { storage } from "../firebase/index"

import { Bar, Doughnut } from 'react-chartjs-2';


const MiCuenta = ({ onGetInfoUserLogged, auth, userInfo, onUpdateUrl }) => {

  const inputRef = useRef(null)

  const [isEditMode, setIsEditMode] = useState(false)

  const [pdf, setPdf] = useState('')

  const [colors, setColors] = useState(['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', '#B3A2A2', "#DB913D", "#DBD83D", "#6DDE39", "#7639DE", "#DE39AA", "#DE3952"])

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

    const [data, setData] = useState({
      labels: ['Propuestas enviadas', 'Propuestas leidas'],
        datasets:[
          {
            label: ['Estadisticas de propuestas'],
            data:[
              0
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ]
          }
        ]
    })

    const [dataDognut, setDataDognut] = useState({
      labels: [],
        datasets:[
          {
            label:'Estadisticas de propuestas',
            data:[
              5,
              1,
              0
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ]
          }
        ]
    })

    const getColorsNotRepeated = (array) => {

      let arreglo = array.map( _ =>  colors[Math.floor(Math.random() * 2) + 0 ] )

     let checkTwo = arreglo.some(valor => {

        return (arreglo.lastIndexOf(valor) - arreglo.indexOf(valor)) === 1 

      })

      if (!checkTwo) {
        return arreglo
      } else {
        getColorsNotRepeated(userInfo.userLoggedInfo.finalData)
      }

    }
  
  useEffect(() => {

    if (auth.user !== undefined) {
      onGetInfoUserLogged()
    }
   
  }, []  )

  useEffect(() => {

    if (userInfo.userLoggedInfo !== null) {

      setSelectedState(userInfo.userLoggedInfo.result.estado)
    

      setData(oldData => ({
        ...oldData,
        datasets: [{
          label: oldData.datasets[0].label,
          data: [userInfo.userLoggedInfo.propuestasNumber, userInfo.userLoggedInfo.propuestasReadNumber, ...oldData.datasets[0].data, Math.floor(userInfo.userLoggedInfo.propuestasNumber * 1.5 )],
          backgroundColor: oldData.datasets[0].backgroundColor
        }]
      }))

      setDataDognut({
        labels: [...userInfo.userLoggedInfo.finalData.map(value => value.nombre)],
        datasets:[
          {
            label:'Areas pertenecientes a publicaciones',
            data:[...userInfo.userLoggedInfo.finalData.map(value => value.veces)],
            backgroundColor: userInfo.userLoggedInfo.finalData.map((_, i) => colors[i] )
          }
        ]
      })

    }


  }, [userInfo.userLoggedInfo])

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
              onUpdateUrl(newUrl)
            })
        }
      )
    })
  }

  const renderItems = () => {

    if(isEditMode) {
      return (
        <div style = {{ marginTop: '20px' }}>
          <input ref = {inputRef} id = "files" type = "file" onChange = { (e) => uploadFile(e.target.files)  } style = {{ display: 'none' }} /> 
          <Button onClick = { () => inputRef.current.click() }>Subir Curriculum</Button>
          {  pdf === "" ? null : <Button onClick = { () => guardarPdf() } style = {{ marginLeft: '10px' }} >Guardar</Button>   }
          <Button variant="danger" onClick = { () => {setIsEditMode(false); setPdf("")  } }  style = {{ marginLeft: '10px' }}  >Quitar modo editable</Button>
        </div>
      )
    } else {
      return(
        <div style = {{ marginTop: '20px' }}>
          <a href = { userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.pdf_url : null  } target="_blank" ><Button variant="success">Ver Curriculum</Button></a>
          <Button variant="warning" onClick = { () => setIsEditMode(true) } style = {{ marginLeft: '10px' }} >Editar</Button>
        </div>
        )
    }

  }

  const renderGraph = () => {



  }

  return (
    <div>
      <Row style = {{ marginRight: '0px', marginLeft: '0px' }}>
        <Col lg = {7}>
          <h1 style = {{ textAlign: 'center' }}>Informacion de cuenta</h1>

          <div style = { { marginTop: '10%' } }>

          <div style = {{ display: 'flex'  }}>

          <div style = {{ flexGrow: '1' }}>
          <Form.Label style = {{ textAlign: 'center', display: 'block' }}>Usuario</Form.Label>
          <Form.Control value = {  userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.username_freelancer : null } disabled={true} />
          </div>

          <div style = {{ flexGrow: '0.5' }}></div>

          <div style = {{ flexGrow:'1' }}>
          <Form.Label style = {{  textAlign: 'center', display: 'block' }}>Nombre</Form.Label>
          <Form.Control value = {  userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.username_nombre : null } disabled ={true} />
          </div>

          </div>

          <div style = {{ display: 'flex' }}>

            <div style = {{ flexGrow: '1' }}>

          <Dropdown drop="up" style={{ marginBottom: "10px", width: "100%", marginTop: '30px' }}>
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="success"
                id="dropdown-basic"
                disabled={true}
              >
                { userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.estado : null }
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%"}} className = "dropdown-register">
                
                {states.map((value) => (
                  <Dropdown.Item onClick={() => setSelectedState(value)}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            </div>

            <div style = {{ flexGrow: '0.5' }}>

            </div>

          <div style = {{ flexGrow: '1' }}>
            
          <Dropdown drop="up" style={{ marginBottom: "10px", width: "100%", marginTop: '30px' }}>
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="success"
                id="dropdown-basic"
                disabled={true}
              >
                { userInfo.userLoggedInfo !== null ? userInfo.userLoggedInfo.result.rubro : null }
              </Dropdown.Toggle>

            </Dropdown>

          </div>

          </div>

          <div>

            <Row>
              { userInfo.userLoggedInfo !== null ?  userInfo.userLoggedInfo.result.area_info.map(valor => {

                return (
                  <Col lg = {6}>
                    <Card>
                        <Card.Body>
                          <label style = { { display: 'block' } }>Area: {valor.nombre_area}</label>
                          <label>Experiencia: {valor.experiencia} </label>
                        </Card.Body>
                    </Card>
                  </Col>
                )

              })  : null  }
            </Row>


          </div>

          { renderItems() }
          </div>




        </Col>
        <Col lg = {5} style = {{ padding: '0' }}>
          <h1 style = {{ textAlign: 'center' }}>Estadisticas</h1>
          
          <Bar data={data} height={200}  />

          <Doughnut data = {dataDognut}  />

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