import { Form, Modal, Button, Container, Row } from "react-bootstrap";
import { createDescipline } from "../../http/desciplineAPI";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { createCourse, delMaterial, getMaterial } from "../../http/courseAPI";
import { fetchDesciplines } from "../../http/desciplineAPI";
import { fetchTeachersByDesc } from "../../http/teacherAPI";
import { Context } from "../../index";
import SocketApi from "../../api/socket-api";
import { useConnectSocket } from "../../hooks/useConnectSocket";

const Chat = ({ show, onHide, materialId }) => {
  const [text, setText] = useState("");
  const { user } = useContext(Context);
  const {message} = useConnectSocket();
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, [message]);

  const sendMessage = () => {
    if(text != '')
    {
        SocketApi.socket?.emit("server-path",user.user.fio + ": " +  text);
        setText('');
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="modal-dialog modal-xl modal-dialog-scrollable"
    >
      <Modal.Header>
        <Modal.Title id="containted-modal-title-vcenter">
          AlexKokos_Chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container style={{height: '55vh'}}>
            {messages.map((msg, index) => (
                <p style={{wordBreak: "break-all"}} key={index}>{msg}</p>
            ))}
        </Container>
        
        
      </Modal.Body>
  
      <Modal.Footer>
      <Container>
          <Row className="d-flex align-items-center">
            <Form className="flex-grow-1">
              <Form.Control
                className="mr-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={"type something..."}
              />
            </Form>
            <Button onClick={sendMessage}>SEND</Button>
          </Row>
        </Container>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Chat;