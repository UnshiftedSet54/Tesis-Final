/* React importaciones */
import React, { useEffect, useState, useRef } from "react";

import { connect } from "react-redux";

import { storage } from "../firebase/index"


/* React Boostrap */
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
  Alert,
} from "react-bootstrap";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressBook,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import "../styles/PageStyles/registerProfesional.css";

import { Spring, Transition } from "react-spring/renderprops";
import { register } from "../actions/authAction";
import { ToastContainer, toast } from "react-toastify";

const RegisterProfesional = (props) => {

  const inputRef = useRef(null)

  useEffect(() => {

    if (props.error.id != null) {
      toast.error(props.error.msg.message)
      props.clearErrors()
    }

  }, [props.error])

  const [isShowPass1, setIsShowPass1] = useState(true);
  const [isShowPass2, setIsShowPass2] = useState(true);

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

  const [confirmPassword, setConfirmPassword] = useState("");

  const [disableButton, setDisableButto] = useState(true);

  const [selectedState, setSelectedState] = useState("Selecciona tu estado");

  const [nameError, setNameError] = useState(null);

  const [usernameError, setUsernameError] = useState(null);

  const [passwordError, setPasswordError] = useState(null);

  const [stateError, setStateError] = useState(null);

  const [pdfError, setPdfError] = useState(null);


  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [copyStates , setCopyStates] = useState([])

  const [pdf, setPdf] = useState("")

  useEffect(() => {

    setCopyStates(states)

  }, [])

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    password: "",
    state: "",
    isBussines: false,
  });


  const stateChange = (v) => {
    setSelectedState(v);
    setUserInfo({ ...userInfo, state: v });
  };

  const checkForm = () => {
    if (userInfo.name === "") {
      errorHandler(setNameError, "Por favor, ingrese un nombre");
    }
    else if (userInfo.username === "") {
      errorHandler(setUsernameError, "Por favor, ingrese un nombre de usuario");
    }
    else if (userInfo.password === "") {
      errorHandler(setPasswordError, "Por favor, ingrese una contraseña");
    }
    else if (userInfo.state === "") {
      errorHandler(setStateError, "Por favor, ingrese una fecha");
    }
    else if (userInfo.password !== confirmPassword && userInfo.password.length > 0) {
      errorHandler(setConfirmPasswordError, "Contraseñas no coinciden");
    } else if (pdf === "") {
      errorHandler(setPdfError, "Por favor, ingrese un curriculum")
    } else if (pdf.type !== "application/pdf") {
      errorHandler(setPdfError, "Por favor, ingrese un curriculum en pdf")
    } else {
      props.onRegister({ ...userInfo,  pdf_url: pdf  }, props.history)
    }
  };

  const errorHandler = (setState, param) => {
    setState(param);
    setTimeout(() => {
      setState(null);
    }, 3000);
  };

  const registrarse = () => {

    checkForm();
  };

  const uplodadFile = async (files) => {

    setPdf(files[0])

  } 

  return (
    <div style={{ height: "100vh" }}>
      <div className="card-continer-profesional">
        <Card className="card-profesional">
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              Crear cuenta
            </Card.Title>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faAddressBook} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                placeholder="Nombre Completo"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Transition
              items={nameError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{nameError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                placeholder="Usuario"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Transition
              items={usernameError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{usernameError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <InputGroup className="mb-3">
              <InputGroup.Prepend onClick={() => setIsShowPass1(!isShowPass1)}>
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  {isShowPass1 ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                  setConfirmPassword(e.target.value == "" ? "" : null);
                }}
                placeholder="Contraseña"
                type={isShowPass1 ? "password" : null}
              />
            </InputGroup>

            <Transition
              items={passwordError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{passwordError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <InputGroup className="mb-3">
              <InputGroup.Prepend onClick={() => setIsShowPass2(!isShowPass2)}>
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  {isShowPass2 ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                disabled={userInfo.password.length == 0}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                type={isShowPass2 ? "password" : null}
                value={confirmPassword}
              />
            </InputGroup>

            <Transition
              items={confirmPasswordError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{confirmPasswordError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <Dropdown drop="up" style={{ marginBottom: "10px", width: "100%" }}>
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="success"
                id="dropdown-basic"
              >
                {selectedState}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%"}} className = "dropdown-register">
                <div style = {{  display: 'flex', justifyContent: 'center' }}>

              <FormControl style = {{ width: '90%' }}
                placeholder="Ingrese ciudad"
                onChange={ (e) => setCopyStates(states.filter( (v) => v.toLowerCase().includes(e.target.value.toLowerCase()) ) )  }
              />
                </div>
                {copyStates.map((value, i) => (
                  <Dropdown.Item key = {i} onClick={() => stateChange(value)}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <div style = {{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <input type = "file" ref = {inputRef} onChange = { (e) =>  uplodadFile(e.target.files) } style = {{ marginBottom: '10px', display: 'none' }} />

            <Button onClick = {() => inputRef.current.click()} variant="success">Subir curriculum</Button>

            </div>
              
            <Transition
              items={pdfError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{pdfError}</Alert>
                  </div>
                ))
              }
            </Transition>
            
            <label style={{ fontSize: "14px" }}>
              <input
                type="checkbox"
                onChange={() => setDisableButto(!disableButton)}
              />{" "}
              Al crear tu cuenta aceptas los terminos de servicio y politica de
              seguridad
            </label>

            <Button
              disabled={disableButton}
              style={{ width: "100%" }}
              variant="success"
              onClick={() => registrarse()}
            >
              Registrarse
            </Button>
            <ToastContainer />


            <hr />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <label style={{ whiteSpace: "nowrap" }}>
                Ya estas registrado?{" "}
              </label>{" "}
              <Link to="/login" style={{ marginLeft: "3px" }}>
                Ingresa
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  const { auth, error } = state;

  return {
    auth,
    error,
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (user, history) => {
      dispatch(register(user, history));
    },
    clearErrors: () => {
      dispatch({ type: "CLEAR_ERRORS" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( RegisterProfesional );
