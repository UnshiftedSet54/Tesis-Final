import axios from "axios";

import {  GET_USER_INFO, CLEAN_USER_INFO, GET_USERINFO_LOGGED  } from "./types";

export const getUserInfo = (id) => async (dispatch) => {


    const resp = await axios.get(`/userinfo/${id}`)

    dispatch({
        type: GET_USER_INFO,
        payload: resp.data.result
    })
}

export const cleanUserInfo = () => {

    return {
        type: CLEAN_USER_INFO
    }

}

export const getUserInfoLogged = () => async (dispatch) => {


    const resp = await axios.get(`/getuserinfologged`)

    console.log("RESP DATA", resp.data)

    dispatch({
        type: GET_USERINFO_LOGGED,
        payload: resp.data
    })
}

export const updateUrl = (newUrl) => async (dispatch) => {


    const resp = await axios.put('/getuserinfologged', {  newUrl })

}