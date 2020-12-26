import { GET_RUBROS } from '../actions/types'

const initialState = {
    rubros: null
};
  

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_RUBROS: 
        return {
            rubros: action.payload
        }
        default: 
            return state

    }


} 