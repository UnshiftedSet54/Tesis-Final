import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import rubroReducer from './rubroReducer'
import areaReducer from './areaReducer'
import isRender from './isRenderReducer'
import anuncios from './anunciosReducer'
import useranuncios from './anunciosUser'
import propuestaReducer from './propuestaReducer'
import userInfoReducer from './userInfoReducer'
import chatReducer from './chatsReducer'

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    rubros: rubroReducer,
    areas: areaReducer,
    isFirstRender: isRender,
    anuncios: anuncios,
    useranuncios: useranuncios,
    propuesta: propuestaReducer,
    userInfo: userInfoReducer,
    chat: chatReducer
})