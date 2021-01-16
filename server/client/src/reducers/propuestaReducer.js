import { SEND_PROPUESTA, CLEAN_PROPUESTA, GET_PROPUESTAS, GET_PROPUESTA_BY_ANUNCIO, UPDATED_PROPUESTA, CLEAN_UPDATED, CLEAN_PROPUESTA_BY_ANUNCIO, LOAD_PROPUESTA } from "../actions/types";

const initialState = {
  msg: null,
  propuestasByUser: null,
  propuestaByAnuncio: null,
  updated: false,
  isLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_PROPUESTA:
      return {
        ...state,
        msg: action.payload
      };
    case CLEAN_PROPUESTA: 
      return {
          ...state,
          msg: null
      }
    case GET_PROPUESTAS:
        return {
            ...state,
            propuestasByUser: action.payload,
            loading: true
        }
    case GET_PROPUESTA_BY_ANUNCIO:
        return {
          ...state,
          isLoading: false,
          propuestaByAnuncio: action.payload
        }
    case UPDATED_PROPUESTA:
        return {
          ...state,
          updated: true
        }
    case CLEAN_UPDATED:
        return {
          ...state,
          updated: false
        }
    case CLEAN_PROPUESTA_BY_ANUNCIO:
        return {
          ...state,
          propuestaByAnuncio: null
        }
    case LOAD_PROPUESTA:
        return {
          ...state,
          isLoading: true
        }
    default:
        return state;
  }
}
