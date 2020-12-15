import { GET_USER_INFO, CLEAN_USER_INFO } from '../actions/types'

const initialState = {
    userInfo: null
};
  

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_USER_INFO: 
        return {
            userInfo: action.payload
        }
        case CLEAN_USER_INFO:
            return {
                userInfo: null
            }
        default: 
            return state

    }


} 