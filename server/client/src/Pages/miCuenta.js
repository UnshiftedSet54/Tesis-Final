/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { connect } from "react-redux";

/* Componentes */
import NavBar from "../components/navBar";

/* React Boostrap */
import { Tab , Tabs } from "react-bootstrap";

/* Pages */
import MiPerfil from '../Pages/miPerfil'
import Cuenta from '../Pages/cuenta'

const MiCuenta = (props) => {
  return (
    <div>
      <NavBar />
      <Tabs style = {{ justifyContent: 'center' }} defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <Cuenta />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <MiPerfil />
        </Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth,
  };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(MiCuenta);
