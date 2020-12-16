import { GET_ANUNCIOS, LOADING_ANUNCIOS } from '../actions/types'

const initialState = {
    anuncios: [],
    isLoading: false,
    notificationsPropuestas : 0
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ANUNCIOS: 
        return {
            anuncios: action.payload.anuncios,
            isLoading: false,
            notificationsPropuestas: action.payload.notificationsPropuestas
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