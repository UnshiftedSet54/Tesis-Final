/* React importaciones */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useParams,
  useRef,
} from "react";

import { connect } from "react-redux";

import { io } from "socket.io-client";

import { Button, Form, Container, Col, Row, ListGroup } from "react-bootstrap";

import { getChat, pushMessage, getChatsByUser, pushLastMessage, cleanChat, pushChatIfNotExist } from "../actions/chatActions";

import "../styles/PageStyles/chatPage.css";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTimes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

let socket;

const ChatPage = (props) => {
  const scroll = useRef(null);
  const otherUser = useRef(null)
  const chatsUser = useRef([])

  const [valor, setValor] = useState("");

  const [, forceUpdate] = useState(0)

  // const [otherUser, setOtherUser] = useState("");

  const scrollAbajo = () => {
    if (scroll.current !== null) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {

    props.onGetChatsByUser(props.auth.user.username_freelancer)

    if (props.match.params.id !== undefined) {

      return () => {
        socket.emit("desconectar");
        socket.off();
      };
    }
  }, []);

  useEffect (() => {

    return () => {
      props.onCleanChat()
    }

  }, [])

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      props.onGetChatInfo(props.match.params.id);
      
       socket = io("");

      /* El back va a estar escuchando esto */
      socket.emit("join", { room: props.match.params.id });

      socket.on("message", (message) => {
        
        props.onSendMessage(message);
        
          let checkIfExist = chatsUser.current.find(value => value.chat_id == props.match.params.id)
          if (!!!checkIfExist) {
            props.onPushChatIfNotExist({
              chat_id : props.match.params.id,
              username_freelancer_one : props.auth.user.username_freelancer,
              username_freelancer_two : otherUser.current,
              lastMessage : message
            })
          }
        
        props.onPushLastMessage(props.match.params.id)
        setValor("");
        scrollAbajo();
      }); 
    }
  }, [props.match.params.id])

  useEffect(() => {
    if (props.chat.chatInfo !== undefined) {
      otherUser.current = props.auth.user.username_freelancer ===
      props.chat.chatInfo.username_freelancer_one
      ? props.chat.chatInfo.username_freelancer_two
      : props.chat.chatInfo.username_freelancer_one

      /* Funcion para forzar el re-renderizado */
      forceUpdate(n => !n)

      setTimeout(() => {
        scrollAbajo();
      }, 500);
    }
  }, [props.chat.chatInfo]);

  useEffect(() => {

    chatsUser.current = props.chat.chatsUser

  }, [props.chat.chatsUser])

  const enviarMensaje = () => {
    socket.emit("sendMessage", {
      texto: valor,
      room: props.match.params.id,
      username: props.auth.user.username_freelancer,
      toUser: otherUser.current,
    });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      enviarMensaje()
    }
  }

  const renderMessages = () => {
    if (props.chat.messages) {
      if (otherUser.current !== null) {
        return props.chat.messages.map((v, i) => {
          return (
            <div
              key = {i}
              style={{
                display: "flex",
                justifyContent:
                  v.username_freelancer === otherUser.current ? "flex-start" : "flex-end",
                marginTop: "10px",
                marginBottom:
                  i === props.chat.messages.length - 1 ? "10px" : null,
              }}
            >
              <div
                style={{
                  maxWidth: "40%",
                  marginLeft: v.username_freelancer === otherUser.current ? "20px" : null,
                  marginRight:
                    v.username_freelancer !== otherUser.current ? "10px" : null,
                  padding: "10px",
                  wordBreak: "break-word",
                  backgroundColor:
                    v.username_freelancer === otherUser.current ? "#91AD9D" : "#14A824",
                  color: "white",
                  borderRadius: "15px",
                }}
              >
                <label style={{ display: "flex" }}>{v.texto}</label>
              </div>
            </div>
          );
        });
      }
    }
  };

  const renderChatsUser = () => {
     
    if (props.chat.chatsUser) {
        
        return props.chat.chatsUser.map((value, i) => {
            return (
                <ListGroup key = {i}>
                   <ListGroup.Item onClick = { () => props.history.push(`/chat/${value.chat_id}`) }>
                       <h4>{ value.username_freelancer_one !== props.auth.user.username_freelancer ? value.username_freelancer_one : value.username_freelancer_two  }</h4>
                       <label> { value.lastMessage.username_freelancer === props.auth.user.username_freelancer ? "Tu" : value.lastMessage.username_freelancer } : { value.lastMessage.texto  }</label>
                   </ListGroup.Item>
                </ListGroup>
            )
        })
         
    }

  }

  return (
    <div
      style={{
        overflowX: "hidden",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col className = "col-chat"
          lg={4}
          style={{ maxHeight: "100%", paddingRight: 0, 
          borderRightColor: "black",
          borderRightWidth: "2px",
          borderRightStyle: "solid" ,
        }}
        >
          <div
            style={{
              height: "10%",
              width: "100%",
              backgroundColor: "#ededed",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Este es el header */}
            <FontAwesomeIcon
              onClick={() => props.auth.user.isbussines ? props.history.push("/mispublicaciones") : props.history.push("/usuariopropuestas")  }
              icon={faArrowLeft}
              style={{ marginLeft: "10%", fontSize: "30px" }}
            />
            <h4 style={{ marginRight: "10%" }}>
              {props.auth.user.username_freelancer}
            </h4>
          </div>

          {renderChatsUser()}
        </Col>

        <Col lg={8} style={{ paddingLeft: "0", height: "100%" }}>
          {props.match.params.id === undefined ? (
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <h1 style={{ textAlign: "center" }}>
                No tienes alguna conversacion abierta actualmente
              </h1>
            </div>
          ) : (
            <div style={{ height: "100%" }}>
              <div
                style={{
                  height: "10%",
                  backgroundColor: "#ededed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {/* Este es el header */}
                <h4 style={{ marginRight: "20%" }}>{otherUser.current}</h4>
                <FontAwesomeIcon
                  onClick={() => props.history.push("/chat")}
                  icon={faTimes}
                  style={{ marginLeft: "20%", fontSize: "30px" }}
                />
              </div>

              <div
                style={{ height: "75%" }}
                className="chat-container"
                id="chat-cont"
              >
                {renderMessages()}
                <div ref={scroll} />
              </div>

              <div  
                style={{
                  height: "15%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  justifyContent: "space-around",
                  
                }}
              >
                <div style={{ width: "90%" }}>
                  <Form.Control
                    className="input-mensaje"
                    style={{ borderRadius: "15px" }}
                    value={valor}
                    onKeyDown = {(e) => handleEnter(e)}
                    placeholder="Escribir mensaje"
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>

                <div>
                  <Button
                    disabled={valor === "" ? true : false}
                    style={{ height: "40px", borderRadius: "20px" }}
                    onClick={(e) => enviarMensaje(e)}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth, chat } = state;
  return {
    auth,
    chat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetChatInfo: (id) => {
      dispatch(getChat(id));
    },
    onSendMessage: (message) => {
      dispatch(pushMessage(message));
    },
    onGetChatsByUser : (id) => {
        dispatch(getChatsByUser(id))
    },
    onPushLastMessage: (chat_id) => {
      dispatch(pushLastMessage(chat_id))
    },
    onCleanChat: () => {
      dispatch(cleanChat())
    },
    onPushChatIfNotExist: (chatInfo) => {
      dispatch(pushChatIfNotExist(chatInfo))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
