/* React importaciones */
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/** Funcion creada para redireccionar hacia el login cuando el usuario no esta logeado */
const PrivateRouteRegister = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.user !== null ? <Component {...props} /> : <Redirect to="/registro/profesional" />
    }
  />
);

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRouteRegister);