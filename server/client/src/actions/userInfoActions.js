import axios from "axios";

import {  GET_USER_INFO, CLEAN_USER_INFO, GET_USERINFO_LOGGED, UPDATE_USERINFO_LOGGED, UPLOAD_FILE } from "./types";

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


    dispatch({
        type: GET_USERINFO_LOGGED,
        payload: resp.data
    })
}

export const updateUrl = (newUrl) => async (dispatch) => {


    const resp = await axios.put('/getuserinfologged', {  newUrl })

    dispatch({
        type: UPDATE_USERINFO_LOGGED,
        payload : resp.data.url
    })

}

export const onLoadURL = () => {

    return {
        type : UPLOAD_FILE
    }

}