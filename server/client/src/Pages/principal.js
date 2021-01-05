/* React importaciones */
import React, { useState, useLayoutEffect } from "react";

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
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Principal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([
    {
      titulo: "Programador",
      src:
        "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2020/02/lenguaje-programacion-1859691.jpg?itok=PSYEVgtj",
      contenido: 'Busca al mejor programador para tu empresa'
    },
    {
      titulo: "Diseño",
      src:
        "https://ideakreativa.net/wp-content/uploads/2020/01/programas-para-dise%C3%B1o-2020-1024x576.jpg",
      contenido: 'Consigue al diseñador mas creativo'
    },
    {
      titulo: "Esritura",
      src:
        "https://i2.wp.com/www.infotecarios.com/wp-content/uploads/escritura.jpg?fit=770%2C410&ssl=1",
      contenido: 'Escritura, redaccion y mas'
    },
    {
      titulo: "Marketing",
      src:
        "https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=EJiZA3cUe78rpkwgKbdvRc$daE2N3K4ZzOUsqbU5sYt8QgJDrP6_oWgzQvrTXjLC6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg",
      contenido: 'Nada mejor que una persona responsable manejando las publicidades'
    },
    {
      titulo: "Administracion",
      src:
        "https://www.grouphealth.ca/wp-content/uploads/2019/12/working-on-plan-administration.jpg",
      contenido: 'Consigue a un experto que sepa administrar tu negocio'
    },
    {
      titulo : "Ingenieria",
      src: 'https://blogs.ucontinental.edu.pe/wp-content/uploads/2017/05/arquitectura-ingenieria-civil.jpg',
      contenido: 'Consigue personal relacionado al ambito de la ingenieria'
    },
    {
      titulo: 'Idiomas',
      src: 'https://www.ecestaticos.com/image/clipping/39db19382aa7eb27f590d33dba6b1f11/opening.jpg',
      contenido: 'Traduccion de texto y mucho mas'
    },
    {
      titulo: 'Leyes',
      src: 'https://www.caraotadigital.net/wp-content/uploads/2019/06/1487244022_000495_1487244627_noticia_normal.jpg',
      contenido: 'Problema legal? Consigue a las personas mas preparadas'
    }
  ]);

  const search = () => {
    console.log("Searching....");

    setIsLoading(true);

    //Peticion

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="Main-page">
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
                  <InputGroup.Text id="basic-addon1">
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
                  />
                  <InputGroup.Append style={{ marginLeft: "5px" }}>
                    <Button variant="dark" onClick={() => search()}>
                      Button
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
              <Col lg={3} sm={6}>
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
                    src="https://cdn0.iconfinder.com/data/icons/conceptual-communication-filled-outline/64/poster-advertisement-_placard-notice-posting-512.png"
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
                    src="https://www.flaticon.com/svg/static/icons/svg/1803/1803330.svg"
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
                    src="https://www.silverkey.org/wp-content/uploads/2018/07/payment-icon-01.jpg"
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
              Ofrecemos un sistema web para profesionales Venezolanos y empresas Venezolanos que quieran destacar en sus profesiones
              siguiendo los valores de:
            </label>

            <label style={{ display: "block" }}>- Transparencia</label>
            <label style={{ display: "block" }}>- Respeto</label>
            <label style={{ display: "block" }}>- Trabajo</label>
            <label style={{ display: "block" }}>- Confianza</label>
          </Col>

          <Col style = {{ display: 'flex', textAlign: 'center' }}>
            <RightSide imgWidth = "100%" imgHeight = "100%" src = "https://freelancingbuzz.com/wp-content/uploads/2019/07/freelancers.jpeg" />
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Principal;
