/* React importaciones */
import React, { useState, useEffect} from "react";
import {  connect } from 'react-redux'

/* React boostrap */
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Button,
  Spinner,
  Container,
  Image,
  Dropdown,
  Modal,
  Badge
} from "react-bootstrap";


/* Components */
import Navbar from "../components/navBar";
import Categories from "../components/categories";
import Footer from "../components/footer";
import RightSide from "../components/rightSide";


/* CSS */
import "../styles/PageStyles/principal.css";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";

/* Importaciones */
import { ToastContainer, toast } from "react-toastify";

/* Actions */
import { getRubros, getRubroInfo } from '../actions/rubroActions'

const Principal = ( { onGetRubros, rubros, onGetRubroInfo, rubroInfo, loadingRubros } ) => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [rubroSelected, setRubroSelected] = useState( {nombre: "Seleccione algun rubro" })

  const [show, setShow] = useState(false)

  const [categories, setCategories] = useState([
    {
      titulo: "Programador",
      src:
        "/assets/ProgramacionImagen.jpg",
      contenido: 'Busca al mejor programador para tu empresa'
    },
    {
      titulo: "Diseño",
      src:
      "/assets/DisenoImagen.jpg",
      contenido: 'Consigue al diseñador mas creativo'
    },
    {
      titulo: "Escritura",
      src:
      "/assets/EscrituraImagen.jpg",
      contenido: 'Escritura, redaccion y mas'
    },
    {
      titulo: "Marketing",
      src:
      "/assets/MarketingImagen.jpg",
      contenido: 'Nada mejor que una persona responsable manejando las publicidades'
    },
    {
      titulo: "Administracion",
      src:
      "/assets/AdministracionImagen.jpg",
      contenido: 'Consigue a un experto que sepa administrar tu negocio'
    },
    {
      titulo : "Ingenieria",
      src: "/assets/IngenieriaImagen.jpg",
      contenido: 'Consigue personal relacionado al ambito de la ingenieria'
    },
    {
      titulo: 'Idiomas',
      src: "/assets/IdiomasImagen.jpg",
      contenido: 'Traduccion de texto y mucho mas'
    },
    {
      titulo: 'Leyes',
      src: "/assets/LeyesImagen.jpg",
      contenido: 'Problema legal? Consigue a las personas mas preparadas'
    }
  ]);

  useEffect(() => {

    //Ver de donde saco el id
    onGetRubros()

  }, [])

  useEffect(() => {

    if (!!rubros) {

      

    }

  }, [rubros])

  useEffect(() => {

    if (!!rubroInfo && !!rubroInfo.data && !isLoading) {
        setShow(true)
    }

    if (!!rubroInfo && !!!rubroInfo.data && !!rubroInfo.msg && !isLoading ) {
      toast.warn(rubroInfo.msg)
    }

  }, [rubroInfo, isLoading])


  const search = () => {

    setIsLoading(true);

    //Peticion
    onGetRubroInfo(rubroSelected.rubro_id)

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const selectRubro = valor => {

    setRubroSelected(valor)
  }

  return (
    <div className="Main-page">

      <Modal show={show} onHide={() => setShow(false) } animation={false} >
        <Modal.Header closeButton>
          <Modal.Title>Cantidad de profesionales registrados como { !!rubroInfo && !!rubroInfo.data ? rubroInfo.data.nombre : null}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style = {{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <FontAwesomeIcon icon = {faCheck} style = {{ marginRight: '20px' }} />
              Cantidad de profesionales inscritos en dicha area: {  !!rubroInfo && !!rubroInfo.data ? <Badge variant="primary">{rubroInfo.data.count}</Badge> : null }
            </div>
            <div>
              <FontAwesomeIcon icon = {faCheck} style = {{ marginRight: '20px' }} />
               El {  !!rubroInfo && !!rubroInfo.data ? <Badge variant="primary">{ Math.round( ( rubroInfo.data.count / rubroInfo.data.users_total ) * 100 ) }%</Badge> : null } de profesionales,
               se registró en el area de { !!rubroInfo && !!rubroInfo.data ? rubroInfo.data.nombre : null }
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Navbar type = "home" />
      <div className="bg-success" style={{ paddingBottom: "5%" }}>
        <div>
          <Row className = "main-container">
            <Col>
            <div className = "center-div">

                <div className = "text-container">

                <h1 style={{ color: "white" }}>
                  Encuentra el talento que <br></br> necesitas{" "}
                </h1>
                </div>

                <InputGroup className="mb-3" style={{ width: "70%" }}>
                  {/* <InputGroup.Text id="basic-addon1">
                    {isLoading ? (
                      <Spinner
                        animation="border"
                        variant="success"
                        style={{ width: "20px", height: "20px" }}
                      >
                        {" "}
                      </Spinner>
                    ) : (
                      <FontAwesomeIcon className="icon" icon={faSearch} />
                    )}
                  </InputGroup.Text>

                  <FormControl
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="¿Que desea buscar?"
                  /> */}
                  
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" style = {{ width: '240px' }}>
                      { rubroSelected.nombre }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                      { !!rubros ? rubros.map((valor, i) => ( <Dropdown.Item onClick = {() => selectRubro(valor) } key = {i}>{valor.nombre}</Dropdown.Item>) ) : null }

                    </Dropdown.Menu>
                </Dropdown>

                  <InputGroup.Append style={{ marginLeft: "5px" }}>
                    <Button variant="dark" onClick={() => search()}>
                      {  isLoading ? <Spinner style = {{ height: '22px', width: '22px' }} animation="border" role="status" /> : 'Buscar'  }
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
            </div>
            </Col>
            <Col>
              <div className = "img-container">
                  
              <Image src = '/work.svg' className = "img" />

                
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Container>
        <h1 style={{ margin: "20px" }}>Categorias</h1>

        <Row>
          {categories.map((v, i) => {
            return (
              <Col key = {i} lg={3} sm={6}>
                <Categories content={v} />
              </Col>
            );
          })}
        </Row>
      </Container>

      <div style={{ background: "#F2EEED", paddingBottom: '30px', paddingTop: '30px' }}>
        <h4 style={{ textAlign: "center" }}>Como funciona?</h4>
        <Container style={{ marginTop: "50px" }}>
          <Row>
            <Col sm = {6} lg = {4} >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "80px", height: "80px"}}
                    src="/assets/PublicaTrabajoImagen.png"
                    roundedCircle
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label style = {{ display: "block"  }}>Publica un trabajo</label>
                  <label
                    style={{ overflowWrap: "break-word", display: "inline" }}
                  >
                    Publica un trabajo en el caso de ser alguna empresa en busca de empleados.
                  </label>
                </div>
              </div>
            </Col>
            <Col sm = {6} lg = {4}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src="/assets/ObtenOfertas.svg"
                    roundedCircle
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label style = {{ display: "block"  }}>Obten ofertas</label>
                  <label
                    style={{ overflowWrap: "break-word", display: "inline" }}
                  >
                    Obten propuestas que vayan adaptados a tu rubro
                  </label>
                </div>
              </div>
            </Col>
            <Col sm = {6} lg = {4}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src='/assets/pagaseguro.jpg'
                    roundedCircle
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label style = {{ display: "block"  }}>Paga rapido y seguro</label>
                  <label
                    style={{ overflowWrap: "break-word", display: "inline" }}
                  >
                    Ponte de acuerdo con tus empleados por medio del chat y pagales de una forma segura
                  </label>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ marginTop: "30px", marginBottom: '30px' }}>
        <Row className = "row-container">
          <Col style = {{ marginBottom : '30px' }}>
            <h1>Lo que ofrecemos</h1>

            <label>
              Ofrecemos un sistema web para profesionales Venezolanos y empresas Venezolanas que quieran destacar en sus profesiones
              siguiendo los valores de:
            </label>

            <label style={{ display: "block" }}>- Transparencia</label>
            <label style={{ display: "block" }}>- Respeto</label>
            <label style={{ display: "block" }}>- Trabajo</label>
            <label style={{ display: "block" }}>- Confianza</label>
          </Col>

          <Col style = {{ display: 'flex', textAlign: 'center' }}>
            <RightSide imgWidth = "100%" imgHeight = "100%" src = "/assets/Trato.jpeg" />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {

  const { rubros } = state

  return {
    rubros : rubros.rubros,
    rubroInfo : rubros.rubroInfo,
    loadingRubros: rubros.isLoading
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    onGetRubros : () => {
      dispatch(getRubros())
    },
    onGetRubroInfo : (id) => {
      dispatch(getRubroInfo(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);
