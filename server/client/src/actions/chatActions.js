import axios from "axios";

import { CREATE_CHAT, GET_CHAT_BY_ID } from "./types";

export const createChat = (data) => async (dispatch) => {

   const res = await axios.post('/createChat', data)

    dispatch({
        type: CREATE_CHAT,
        payload : res.data.chatId
    })

}

export const getChat = (id) => async (dispatch) => {

    const res = await axios.get(`/chat/${id}`)

    dispatch({
        type: GET_CHAT_BY_ID,
        payload: res.data.chat
    })

}
