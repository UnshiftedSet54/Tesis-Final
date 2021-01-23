import { GET_RUBROS, GET_RUBRO_INFO, GET_RUBROS_LOADING } from '../actions/types'

const initialState = {
    rubros: null,
    rubroInfo: null,
    isLoading: false
};
  

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_RUBROS: 
        return {
            rubros: action.payload
        }
        case GET_RUBRO_INFO:
        return {
            ...state,
            rubroInfo: action.payload,
            isLoading: false
        }
        case GET_RUBROS_LOADING:
        return {
            ...state,
            isLoading: true
        }
        default: 
            return state
    }


} 