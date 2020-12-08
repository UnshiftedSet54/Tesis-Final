/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import { connect } from "react-redux";

import NavBar from '../components/navBar'

import { SET_RENDER } from '../actions/types'

const Dashboard = (props) => {

    useEffect (() => {
      if(props.isFirstRender.firstRender) {
        toast.success("Bienvenido " + props.auth.user.nombre_completo )
        props.onFistRenderChange()
      }
    }, [])

  return (
    <div>
        <NavBar />
      <h1>Dashboard</h1>
      {  }
      <ToastContainer type = "logeado" />
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

const mapDispatchToProps = (dispatch) => {

  return {
    onFistRenderChange: () => {
      dispatch({type: SET_RENDER })
    }

  }
   

}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)
