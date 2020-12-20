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

import axios from "axios";

import { getChat, pushMessage, getChatsByUser } from "../actions/chatActions";

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

  const [valor, setValor] = useState("");

  const [otherUser, setOtherUser] = useState("");

  const scrollAbajo = () => {
    if (scroll !== null) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      console.log("IDDD", props.match.params.id);

      props.onGetChatsByUser(props.auth.user.username_freelancer)

      props.onGetChatInfo(props.match.params.id);
      


      socket = io("");

      console.log("SOCKET", socket);
      console.log("ID", props.match.params.id);
      /* El back va a estar escuchando esto */
      socket.emit("join", { room: props.match.params.id });

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    }
  }, []);

  useEffect(() => {
    if (props.chat.chatInfo !== undefined) {
      setOtherUser(
        props.auth.user.username_freelancer ===
          props.chat.chatInfo.username_freelancer_one
          ? props.chat.chatInfo.username_freelancer_two
          : props.chat.chatInfo.username_freelancer_one
      );
      setTimeout(() => {
        scrollAbajo();
      }, 1500);
    }
  }, [props.chat.chatInfo]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("message", (message) => {
        props.onSendMessage(message);
        setValor("");
        scrollAbajo();
      });
    }
  }, []);

  const enviarMensaje = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      texto: valor,
      room: props.match.params.id,
      username: props.auth.user.username_freelancer,
      toUser: otherUser,
    });
  };

  const renderMessages = () => {
    if (props.chat.messages !== null) {
      return props.chat.messages.map((v, i) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent:
                v.username_freelancer === otherUser ? "flex-start" : "flex-end",
              marginTop: "10px",
              marginBottom:
                i === props.chat.messages.length - 1 ? "10px" : null,
            }}
          >
            <div
              style={{
                maxWidth: "40%",
                marginLeft: v.username_freelancer === otherUser ? "20px" : null,
                marginRight:
                  v.username_freelancer !== otherUser ? "10px" : null,
                padding: "10px",
                wordBreak: "break-word",
                backgroundColor:
                  v.username_freelancer === otherUser ? "#91AD9D" : "#14A824",
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
  };

  const renderChatsUser = () => {
     
    if (props.chat.chatsUser !== null) {
        
        return props.chat.chatsUser.map(valor => {
            return (
                <ListGroup>
                   <ListGroup.Item>
                       <h4>{ valor.username_freelancer_one !== props.auth.user.username_freelancer ? valor.username_freelancer_one : valor.username_freelancer_two  }</h4>
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
        <Col
          lg={4}
          style={{ backgroundColor: "green", height: "100%", paddingRight: 0 }}
        >
          <div
            style={{
              height: "10%",
              width: "100%",
              backgroundColor: "#ededed",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRightColor: "black",
              borderRightWidth: "2px",
              borderRightStyle: "solid",
            }}
          >
            {/* Este es el header */}
            <FontAwesomeIcon
              onClick={() => props.history.push("/mispublicaciones")}
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
                <h4 style={{ marginRight: "20%" }}>{otherUser}</h4>
                <FontAwesomeIcon
                  onClick={() => props.history.push("/chat")}
                  icon={faTimes}
                  style={{ marginLeft: "20%", fontSize: "30px" }}
                />
              </div>

              <div
                style={{ maxHeight: "75%" }}
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
                  marginTop: '53%'
                }}
              >
                <div style={{ width: "90%" }}>
                  <Form.Control
                    className="input-mensaje"
                    style={{ borderRadius: "15px" }}
                    value={valor}
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
