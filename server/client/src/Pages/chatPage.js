/* React importaciones */
import React, { useState, useEffect, useLayoutEffect, useParams } from "react";

import { connect } from "react-redux";

import { io } from 'socket.io-client'

import {  Button, Form } from 'react-bootstrap'

import axios from 'axios'

import { getChat } from "../actions/chatActions"

let socket;

const ChatPage = (props) => {

    const [valor, setValor] = useState('')

    useEffect (() => {

        props.onGetChatInfo(props.match.params.id)

        socket = io('')

        console.log("SOCKET", socket)
        console.log("ID", props.match.params.id)
        /* El back va a estar escuchando esto */
        socket.emit('join', { room: props.match.params.id })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            console.log("MESSAGE", message)
        })
    }, [])


    const enviarMensaje = (e) => {

        e.preventDefault()
            socket.emit('sendMessage', { texto : valor, room: props.match.params.id, username: props.auth.user.username_freelancer, toUser: props.auth.user.username_freelancer === props.chat.username_freelancer_one ? props.chat.username_freelancer_two : props.chat.username_freelancer_one })
        }

  return (
    <div>
      <h1>Chat</h1>

      <Form.Control
              placeholder="Escribir mensaje"
              onChange = {(e) => setValor(e.target.value) }
              
            />        
    <Button onClick = {(e) => enviarMensaje(e) }>Enviar Mensaje</Button>

    </div>
  );
};

const mapStateToProps = (state) => {

    const { auth, chat } = state
    return {
        auth,
        chat: chat.chat
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onGetChatInfo: (id) => {
            dispatch(getChat(id))
        }
    }

}

export default connect (mapStateToProps, mapDispatchToProps) (ChatPage)
