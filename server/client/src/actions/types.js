/* Auth Reducer */
export const USER_LOADING = "USER_LOADING"
export const USER_LOADED = "USER_LOADED"
export const AUTH_ERROR = "AUTH_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"


/* Error reducer */
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const NOT_USER = "NOT_USER"

/* Rubros */
export const GET_RUBROS = 'GET_RUBROS'

/* Areas */
export const GET_AREAS = 'GET_AREAS'
export const SEND_AREAS = 'SEND_AREAS'

/* Render */
export const SET_RENDER = 'SET_RENDER'

/* Anuncios */
export const GET_ANUNCIOS = 'GET_ANUNCIOS'
export const LOADING_ANUNCIOS = 'LOADING_ANUNCIOS'
export const CHANGE_NOTIFICATION = 'CHANGE_NOTIFICATION'

/* User anuncios */
export const GET_ANUNCIO_BY_USER = 'GET_ANUNCIO_BY_USER'
export const LOADING_ANUNCIO_BY_USER = 'LOADING_ANUNCIO_BY_USER'
export const DELETE_ANUNCIO_BY_ID = 'DELETE_ANUNCIO_BY_USER'
export const UPDATE_ANUNCIO_BY_ID = 'UPDATE_ANUNCIO_BY_ID'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const SAVE_ANUNCIO = 'SAVE_ANUNCIO'

/* Propuesta */
export const SEND_PROPUESTA = 'SEND_PROPUESTA'
export const CLEAN_PROPUESTA = "CLEAN_PROPUESTA"
export const GET_PROPUESTAS = "GET_PROPUESTAS"
export const GET_PROPUESTA_BY_ANUNCIO = "GET_PROPUESTA_BY_ANUNCIO"
export const UPDATED_PROPUESTA = "UPDATED_PROPUESTA"
export const CLEAN_UPDATED = "CLEAN_UPDATED";
export const CLEAN_PROPUESTA_BY_ANUNCIO = 'CLEAN_PROPUESTA_BY_ANUNCIO'
export const LOAD_PROPUESTA = 'LOAD_PROPUESTA'

/* User info cuando (usuario no logeado) */
export const GET_USER_INFO = 'GET_USER_INFO'
export const CLEAN_USER_INFO = 'CLEAN_USER_INFO'

/* Chats */
export const CREATE_CHAT = 'CREATE_CHAT'
export const GET_CHAT_BY_ID = 'GET_CHAT_BY_ID'
export const GET_MESSAGES = 'GET_MESSAGES'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const GET_CHATS_BY_USER = 'GET_CHATS_BY_USER'
export const PUSH_LAST_MESSAGE = 'PUSH_LAST_MESSAGE'
export const CLEAN_CHAT = "CLEAN_CHAT"
export const PUSH_CHAT_IF_NOT_EXIST = 'PUSH_CHAT_IF_NOT_EXIST'

/* User info del usuario logeado */
export const GET_USERINFO_LOGGED = 'GET_USERINFO_LOGGED'
export const UPDATE_USERINFO_LOGGED = 'UPDATE_USERINFO_LOGGED'
export const UPLOAD_FILE = 'UPLOAD_FILE'
