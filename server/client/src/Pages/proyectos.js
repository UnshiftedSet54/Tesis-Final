/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";


import { connect } from "react-redux";

import NavBar from '../components/navBar'


const Proyectos = (props) => {

    useEffect (() => {
     
    }, [])

  return (
    <div>
        <NavBar />
        <h1>Proyectos</h1>
    </div>
  );
};

const mapStateToProps = (state) => {

    const { auth, isFirstRender } = state

    return {
        auth,
        isFirstRender
    }
}

// const mapDispatchToProps = (dispatch) => {

//   return {
//     onFistRenderChange: () => {
//       dispatch({type: SET_RENDER })
//     }

//   }
   

// }

export default connect(mapStateToProps, null) (Proyectos)
