/* React importaciones */
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";


/* CSS */
import "../styles/PageStyles/postRegister.css";

/* React Boostrap */
import { Card, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";


const PostRegister = (props) => {

    const [isDisable, setIsDisable] = useState(true)

  return (
    <div style={{ height: "100vh" }}>
      { console.log("PROPS", props) }
      <div className="content-container">
        <Card className = "card-style-post">
          <Card.Body>
            <Container>
              <Row>
                <Col lg={8} md = {12} className = "left-content-post" >
                  <h3 style = {{ textAlign: 'center' }}>Hola {  props.auth !== null ? props.auth.nombre_completo : null  } bienvenido a (Nombre pagina)</h3>
                  <label style = {{ marginTop: '10px' }}>
                    Aqui te ayudaremos a crear tu perfil como freelancer para
                    que consigas tu primer proyecto. Sigue estos pasos, y llena
                    toda la informacion posible para que aumenten tus
                    posibilidades de conseguir empleo.
                    <br />
                    <br />
                    Ten en cuenta que un perfil con poca informacion es un
                    perfil sin transparencia, por ende tus posibilidades de
                    conseguir trabajo se veran afectadas de manera directa
                  </label>
                  <br />
                  <br />
                  <label className = "checkbox-container">
                    <input
                      name="isGoing"
                      type="checkbox"
                      style = {{ marginRight: '5px' }}
                      className = "checkbox-style"
                      onChange={ () => setIsDisable(!isDisable)   }
                    />
                    Entendido
                  </label>
                </Col>
                <Col lg={4} md = {12} className = "right-content-post">
                    <Image className = "img-container-post" src="https://consejos-de.com/wp-content/uploads/2018/05/working-3406785_640-compressor.jpg" fluid />     
                    <div className = "boton-contenedor">    
                    <Button onClick = { () => props.history.push('/registro/rubro')  } style = {{ marginTop: '10%', borderRadius: '20px' }} variant="success" disabled = {isDisable}>Comenzar</Button>
                    </div>   
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  console.log("STATE", state)

  const {  auth  } = state

  return {
    auth: auth.user
  }

}

// const mapDispatchToProps = (dispatch) => {



// }

export default connect(mapStateToProps, null) (PostRegister);
