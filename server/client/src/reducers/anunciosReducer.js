import { GET_ANUNCIOS, LOADING_ANUNCIOS } from '../actions/types'

const initialState = {
    anuncios: [],
    isLoading: false
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ANUNCIOS: 
        return {
            anuncios: action.payload,
            isLoading: false
        }
        case LOADING_ANUNCIOS:
            return {
                ...state,
                isLoading: true  
            }
        default: 
            return state
    }


} 