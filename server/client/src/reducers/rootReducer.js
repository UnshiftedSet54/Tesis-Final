import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import rubroReducer from './rubroReducer'
import areaReducer from './areaReducer'
import isRender from './isRenderReducer'
import anuncios from './anunciosReducer'
import useranuncios from './anunciosUser'

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    rubros: rubroReducer,
    areas: areaReducer,
    isFirstRender: isRender,
    anuncios: anuncios,
    useranuncios: useranuncios
})