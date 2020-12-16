import axios from "axios";

import {  GET_USER_INFO, CLEAN_USER_INFO  } from "./types";

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