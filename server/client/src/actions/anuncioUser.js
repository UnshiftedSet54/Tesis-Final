import axios from "axios";

import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER, DELETE_ANUNCIO_BY_ID, UPDATE_ANUNCIO_BY_ID, CLEAR_MESSAGE, SAVE_ANUNCIO } from "./types";

export const getAnuncioByUser = () => async (dispatch) => {

    dispatch({type: LOADING_ANUNCIO_BY_USER })

    const resp = await axios.get('/personalposts')

    dispatch({type: GET_ANUNCIO_BY_USER, payload: resp.data.anuncios })

}

export const deleteAnuncioById = (id) => async (dispatch) => {

    const resp = await axios.delete(`/personalposts/${id}`)

    dispatch({type: DELETE_ANUNCIO_BY_ID, payload: { id , message : resp.data.message  }})
    
}

export const updateAnuncioById = (id , content, isEditMode, setIsEditMode, index) => async (dispatch) => {

    let respuesta = await axios.put(`/personalposts/${id}`, content)

    let newValue = [...isEditMode];

    newValue[index] = !isEditMode[index];

    setIsEditMode(newValue);

    dispatch({type: UPDATE_ANUNCIO_BY_ID, payload: respuesta.data.message})

}

export const clearMessage = () => {

    return {
        type: CLEAR_MESSAGE
    }

}

export const saveAnuncio = (data) => async (dispatch) => {

    let respuesta = await axios.post('/anunciosnegocios', data)

    dispatch( { type: SAVE_ANUNCIO, payload: respuesta.data.message  }  )

    dispatch({type: LOADING_ANUNCIO_BY_USER })

    const resp = await axios.get('/personalposts')

    dispatch({type: GET_ANUNCIO_BY_USER, payload: resp.data.anuncios })
}


