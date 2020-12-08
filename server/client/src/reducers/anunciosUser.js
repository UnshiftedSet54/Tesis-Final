import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER, DELETE_ANUNCIO_BY_ID, UPDATE_ANUNCIO_BY_ID, CLEAR_MESSAGE, SAVE_ANUNCIO } from '../actions/types'

const initialState = {
    userAnuncios: [],
    isLoading: false,
    msg: ''
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ANUNCIO_BY_USER: 
        return {
            userAnuncios: action.payload,
            isLoading: false
        }
        case LOADING_ANUNCIO_BY_USER:
            return {
                ...state,
                isLoading: true  
            }
        case DELETE_ANUNCIO_BY_ID:
            return {
                ...state,
                userAnuncios : state.userAnuncios.filter(v => v.anuncio_id !== action.payload.id ),
                msg: action.payload.message
            }
        case UPDATE_ANUNCIO_BY_ID:
            return {
                ...state,
                msg: action.payload
            }
        case CLEAR_MESSAGE: 
            return {
                ...state,
                msg: ''
            }
        case SAVE_ANUNCIO:
            return {
                ...state,
                msg: action.payload,
                userAnuncios: [...state.userAnuncios ]
            }
        default: 
            return state
    }
} 