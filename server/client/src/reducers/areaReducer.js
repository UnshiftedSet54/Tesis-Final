import { GET_AREAS, SEND_AREAS } from '../actions/types'

const initialState = {
    areas: '',
    resp: '',
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case GET_AREAS: 
        return {
            areas: action.payload
        }
        case SEND_AREAS:
            return {
                ...state,
                resp: action.payload.msg
            }
        default: 
            return state
    }


} 