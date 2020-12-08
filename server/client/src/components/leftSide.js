/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* Actions */
import { login } from "../actions/authAction";
import { NOT_USER } from "../actions/types";

/* React Boostrap */
import {
  Form,
  Button,
  Spinner,
  InputGroup,
  FormControl,
  Alert
} from "react-bootstrap";

/* Otros */
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import KeyboardEventHandler from "react-keyboard-event-handler";

/* CSS */
import "axios-progress-bar/dist/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ComponentsStyles/LeftSide.css"

const LeftSide = ({ onLogin, history, auth, error, clearErrors }) => {

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

  /* Antes de que renderice en el dom */
  useLayoutEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/home");
    }
  }, []);

  /* Cuando abandona la view */
  useEffect(() => {
    return () => {
      clearErrors()
    }
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
    } else if (usuario.length < 4) {
      errorHandler(setUserError, "Usuario muy corto");
    } else if (password == "") {
      errorHandler(setPasswordError, "Por favor ingrese valores en el input");
    } else if (password.length < 4) {
      errorHandler(setPasswordError, "Contraseña muy corta");
    }  else {
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
      {loadProgressBar()}
      <KeyboardEventHandler
        handleKeys={["enter"]}
        onKeyEvent={(key, e) => onLogin(usuario, password, history)}
      />

      <Form>
        <Form.Group>
          <Form.Label>Ingresa nombre de usuario</Form.Label>
          <div className="input-wrapper">
            <Form.Control
              placeholder="usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          {userError !== null ? (
            <div>
              <Alert variant = 'danger'> 
                {userError}
            </Alert>
            </div>

          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingresa contraseña</Form.Label>

          <InputGroup className="mb-3">
            <Form.Control
              type = { isShow ? null : 'password' }
              placeholder="contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputGroup.Append onClick = {() => setIsShow(!isShow)} >
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon className="icon" icon={ isShow ? faEyeSlash : faEye } />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          

            <TransitionGroup>

          <CSSTransition time = {300} className = "fade">
          {passwordError !== null ? (
            <div>
              <Alert variant = 'danger'> 
                {passwordError}
            </Alert>
            </div>
          ) : null}
          </CSSTransition>

            </TransitionGroup>
        </Form.Group>

        <Button onClick={() => checkForm()}>Ingresar</Button>
        <ToastContainer />
      </Form>

      <Button onClick={() => history.push("/registro")} variant="success">
        Crear Cuenta nueva
      </Button>
    </div>
  );
}


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
    clearErrors : () => {
      dispatch({ type : 'CLEAR_ERRORS' })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);
