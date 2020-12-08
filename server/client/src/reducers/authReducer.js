import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL  } from '../actions/types'

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem("user")) === null ? null : true,
    isLoading: false, 
    user: JSON.parse(localStorage.getItem("user"))
}

export default function (state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                // user: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false, 
                isLoading: false
            }
        default:
            return state
        

    }
}