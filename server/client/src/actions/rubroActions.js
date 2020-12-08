import axios from 'axios'

import { GET_RUBROS } from './types'

export const getRubros = () => async dispatch => {

        const resp = await axios.get('/rubros')

        dispatch({type: GET_RUBROS, payload: resp.data.rubros })

        console.log("RESP AXIOS RUBROS", resp)
}

