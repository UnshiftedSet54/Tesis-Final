import axios from "axios";

import { GET_ANUNCIOS, LOADING_ANUNCIOS } from "./types";

export const getAnuncios = (query) => async (dispatch) => {

    dispatch({type: LOADING_ANUNCIOS })

    const resp = await axios.get('/anunciosnegocios'+query)

    dispatch({type: GET_ANUNCIOS, payload: resp.data })

}

