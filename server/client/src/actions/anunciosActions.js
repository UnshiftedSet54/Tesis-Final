import axios from "axios";

import { GET_ANUNCIOS, LOADING_ANUNCIOS, CHANGE_NOTIFICATION } from "./types";

export const getAnuncios = (query) => async (dispatch) => {

    console.log("QUERYY", query)

    dispatch({type: LOADING_ANUNCIOS })

    const resp = await axios.get('/anunciosnegocios'+query)


    dispatch({type: GET_ANUNCIOS, payload: resp.data })

}

export const changeNotification = () => {

    return {
        type: CHANGE_NOTIFICATION
    }

}

