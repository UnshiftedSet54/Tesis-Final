import axios from 'axios'

import { GET_RUBROS, GET_RUBRO_INFO, LOADING_DONE_RUBRO, GET_RUBROS_LOADING } from './types'

export const getRubros = () => async dispatch => {

        const resp = await axios.get('/rubros')

        dispatch({type: GET_RUBROS, payload: resp.data.rubros })
}

export const getRubroInfo  = (id) => async dispatch => {

        dispatch({ type : GET_RUBROS_LOADING })

        const resp = await axios.get(`/rubroinfo/${id}`)

        dispatch({type : GET_RUBRO_INFO , payload: resp.data})

}

