import { CREATE_CHAT, GET_CHAT_BY_ID } from '../actions/types'

const initialState = {
    chatId: null
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
                chat: action.payload
            }
        default: 
            return state
    }


} 