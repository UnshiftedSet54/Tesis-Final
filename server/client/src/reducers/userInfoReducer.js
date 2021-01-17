import { GET_USER_INFO, CLEAN_USER_INFO, GET_USERINFO_LOGGED, UPDATE_USERINFO_LOGGED, UPLOAD_FILE } from '../actions/types'

const initialState = {
    userInfo: null,
    userLoggedInfo: null,
    isLoading: false
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
        case UPDATE_USERINFO_LOGGED:
            return {
                ...state, 
                isLoading: false,
                userLoggedInfo: {
                    ...state.userLoggedInfo,
                    result: {
                        ...state.userLoggedInfo.result,
                        pdf_url: action.payload
                    }
                }
            }
        case UPLOAD_FILE:
            return {
                ...state,
                isLoading: true
            }
        default: 
            return state

    }


} 