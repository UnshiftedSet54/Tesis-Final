/* React importaciones */
import React, { useState, useEffect, useLayoutEffect, useParams } from "react";

import { connect } from "react-redux";

import NavBar from "../components/navBar"

import { getPropuestas } from '../actions/propuestaActions'

const UserPropuestas = ( { auth, onGetPropuesta, propuestas } ) => {

    useEffect(() => {
        onGetPropuesta(auth.username_freelancer)
    }, [])

    return (
        <div>
            <NavBar />
            <h1>User Propuestas</h1>
        </div>
    )
}

const mapStateToProps = (state) => {

    const {  auth, propuesta  } = state

    return {
        auth: auth.user,
        propuestas: propuesta.propuestasByUser
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onGetPropuesta: (id) => {
            dispatch(getPropuestas(id))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (UserPropuestas)
