import { CREATE_CHAT, GET_CHAT_BY_ID, GET_MESSAGES, SEND_MESSAGE, GET_CHATS_BY_USER } from '../actions/types'

const initialState = {
    chatId: null,
    messages: null,
    chatsUser: null,
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case CREATE_CHAT: {
            return {
                chatId: action.payload
            }
        }
        case GET_CHAT_BY_ID: 
            return {
                ...state,
                chatInfo: action.payload.chat,
                messages: action.payload.messages
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case GET_CHATS_BY_USER:
            return {
                ...state,
                chatsUser: action.payload
            }
        default: 
            return state
    }


} 