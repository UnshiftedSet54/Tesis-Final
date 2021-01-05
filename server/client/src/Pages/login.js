/* React importaciones */
import React, { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";

/* CSS */
import "../styles/PageStyles/login.css";

/* Actions */
import { login } from "../actions/authAction";
import { NOT_USER } from "../actions/types";

/* React Boostrap */
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Form,
  Alert,
} from "react-bootstrap";

/* Otros */
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import { faUser, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Spring, Transition } from "react-spring/renderprops";

/* CSS */
import "axios-progress-bar/dist/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin, history, auth, error, clearErrors }) => {
  /* Antes de renderizar la view */
  useEffect(() => {
    if (error.id != null) {
      if (error.id == NOT_USER) {
        toast.warn(error.msg.message);
      } else {
        toast.error(error.msg.message);
      }
    }
  }, [error]);

  const items = [1, 2, 34, 5, 6, 77];

  /* Antes de que renderice en el dom */
  useLayoutEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/home?b0=0&");
    }
  }, []);

  /* Cuando abandona la view */
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState(null);

  const [passwordError, setPasswordError] = useState(null);

  const [isShow, setIsShow] = useState(false);

  const checkForm = () => {
    if (usuario == "" && password == "") {
      errorHandler(setUserError, "Por favor, ingrese valores en el input");
      errorHandler(setPasswordError, "Por favor ingrese valores en el input");
    }
    if (usuario == "") {
      errorHandler(setUserError, "Por favor, ingrese valores en el input");
    } else if (password.length < 4) {
      errorHandler(setPasswordError, "Contraseña muy corta");
    } else {
      console.log("VER")
      onLogin(usuario, password, history);
    }
  };

  const errorHandler = (setState, param) => {
    setState(param);
    setTimeout(() => {
      setState(null);
    }, 3000);
  };

  return (
    <div>
     
      <div className="page-container">
      {loadProgressBar()}
      <KeyboardEventHandler
        handleKeys={["enter"]}
        onKeyEvent={(key, e) => onLogin(usuario, password, history)}
      />

        <Card className="card-container">
          <Card.Body>
            <Form.Label>Usuario</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Usuario"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setUsuario(e.target.value)}
              />
            </InputGroup>
            {/* {userError !== null ? (
              <div>
                <Alert variant="danger">{userError}</Alert>
              </div>
            ) : null} */}

            <Transition
              items={userError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{userError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <Form.Label>Contraseña</Form.Label>

            <InputGroup className="mb-3">
              <InputGroup.Prepend onClick={() => setIsShow(!isShow)}>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Contraseña"
                type={isShow ? null : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            {/* {passwordError !== null ? (
              <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {(props) => (
                  <div style={props}>
                    {" "}
                    <Alert variant="danger">{passwordError}</Alert>
                  </div>
                )}
              </Spring>
            ) : null} */}

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

            {/* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}  >
              {(props) => <div style={props}></div>}
            </Spring> */}

            {/* {passwordError !== null ? (
              <div>
                <Alert variant="danger">{passwordError}</Alert>
              </div>
            ) : null} */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => checkForm()}
                style={{ width: "100%" }}
                variant="primary"
              >
                Iniciar Sesion
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              <Button
                onClick={() => history.push("/registro")}
                style={{ width: "100%" }}
                variant="success"
              >
                Registrarse
              </Button>
              <ToastContainer />
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
    onLogin: (usuario, password, history) => {
      dispatch(login(usuario, password, history));
    },
    clearErrors: () => {
      dispatch({ type: "CLEAR_ERRORS" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
