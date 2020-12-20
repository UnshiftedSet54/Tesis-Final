import axios from "axios";

import { CREATE_CHAT, GET_CHAT_BY_ID, SEND_MESSAGE, GET_CHATS_BY_USER  } from "./types";

export const createChat = (data) => async (dispatch) => {

   const res = await axios.post('/createChat', data)

    dispatch({
        type: CREATE_CHAT,
        payload : res.data.chatId
    })
}

export const getChat = (id) => async (dispatch) => {

    const res = await axios.get(`/chat/${id}`)

    const messages = await axios.get(`/messages/${id}`)

    dispatch({
        type: GET_CHAT_BY_ID,
        payload: { ...res.data, ...messages.data  }
    })
}

export const pushMessage = message => {

    console.log("MENSAJE", message)

    return {
        type: SEND_MESSAGE,
        payload: message
    }

    // dispatch({
    //     type: SEND_MESSAGE,
    //     payload: 
    // })

}

export const getChatsByUser = (id) => async (dispatch) => {
   
     
    const resp = await axios.get(`/chatuser/${id}`)

    console.log("RESP CHAT INFO", resp.data)

    dispatch({
        type: GET_CHATS_BY_USER,
        payload: resp.data.mensajeInfo
    })

}