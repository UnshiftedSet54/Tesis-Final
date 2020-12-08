/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { connect } from "react-redux";

const MiPerfil = (props) => {

  return (
    <div>
      <h1>Mi Perfil</h1>
    </div>
  );
};

const mapStateToProps = (state) => {

    const { auth } = state

    return {
        auth
    }
}

const mapDispatchToProps = () => {


}

export default connect(mapStateToProps, mapDispatchToProps) (MiPerfil)
