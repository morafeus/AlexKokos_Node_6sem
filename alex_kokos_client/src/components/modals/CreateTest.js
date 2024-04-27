import React, { useContext, useState } from "react";
import { Form, Modal, Button, Dropdown, Col, Row } from "react-bootstrap";
import { Context } from "../../index";


const CreateTest =({show, onHide}) => {
    const {descipline} = useContext(Context);
    const [question, setQuestion] = useState([])

    const addQuestion = () => {
        setQuestion([...question, {question: '', answers: '', answer_count: 0, answer_right: 0, number:Date.now()}])
    }

    const removeQuestion = (number) => {
        setQuestion(question.filter(i => i.number !== number))
    }

    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
        <Modal.Header>
            <Modal.Title id="containted-modal-title-vcenter">Add Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control className="m-2" placeholder={"input Test name"}/>
                <Form.Control className="m-2"  placeholder={"input Test description"}/>
                <hr/>
                <Button onClick={addQuestion}>Add Question</Button>
                {question.map(i => 
                    <Row className="m-1" key={i.number}>
                        <Col md={3}>
                            <Form.Control placeholder="question"/>
                        </Col>
                        <Col md={3}>
                            <Form.Control placeholder="answers"/>
                        </Col>
                        <Col md={2}>
                            <Form.Control placeholder="answer count" type="number"/>
                        </Col>
                        <Col md={2}>
                            <Form.Control placeholder="right_answer"/>
                        </Col>
                        <Col md={2}>
                            <Button onClick={() => removeQuestion(i.number)} variant={"outline-danger"}>Delete</Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Close</Button>
            <Button variant="outline-success" onClick={onHide}>Add</Button>
        </Modal.Footer>
    </Modal>
    );
};

export default CreateTest;