import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

const CreateDescipline =({show, onHide}) => {
    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="containted-modal-title-vcenter">Add Descipline</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"input descipline name"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDescipline;