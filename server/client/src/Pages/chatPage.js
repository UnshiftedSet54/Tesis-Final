/* React importaciones */
import React, { useState, useEffect, useLayoutEffect, useParams } from "react";

import { connect } from "react-redux";

import { io } from 'socket.io-client'

import {  Button, Form } from 'react-bootstrap'

import axios from 'axios'

let socket;

const ChatPage = (props) => {

    const [valor, setValor] = useState('')

    useEffect (() => {

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
            console.log("VALOR", valor)
            socket.emit('sendMessage', { texto : valor, room: props.match.params.id, username: props.auth.user.username_freelancer, toUser: 'carlos' })
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

    const { auth } = state

    return {
        auth
    }

}

export default connect (mapStateToProps, null) (ChatPage)
