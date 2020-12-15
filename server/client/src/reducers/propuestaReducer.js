import { SEND_PROPUESTA, CLEAN_PROPUESTA, GET_PROPUESTAS, GET_PROPUESTA_BY_ANUNCIO } from "../actions/types";

const initialState = {
  msg: null,
  propuestasByUser: null,
  propuestaByAnuncio: null
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
            propuestasByUser: action.payload
        }
    case GET_PROPUESTA_BY_ANUNCIO:
        return {
          ...state,
          propuestaByAnuncio: action.payload
        }
    default:
        return state;
  }
}
