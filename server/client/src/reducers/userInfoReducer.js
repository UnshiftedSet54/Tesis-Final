import { GET_USER_INFO, CLEAN_USER_INFO, GET_USERINFO_LOGGED } from '../actions/types'

const initialState = {
    userInfo: null,
    userLoggedInfo: null
};
  

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_USER_INFO: 
        return {
            ...state,
            userInfo: action.payload
        }
        case CLEAN_USER_INFO:
            return {
                ...state,
                userInfo: null
            }
        case GET_USERINFO_LOGGED:
            return {
                ...state,
                userLoggedInfo: action.payload
            }
        default: 
            return state

    }


} 