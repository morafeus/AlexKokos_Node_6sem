import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { createDescipline } from "../../http/desciplineAPI";

const CreateDescipline =({show, onHide}) => {
    const [value, setValue] = useState('')
    const addDisc = () => {
        createDescipline({descipline_name: value}).then(data =>{ setValue('')
        onHide()})

    }
    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="containted-modal-title-vcenter">Add Descipline</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder={"input descipline name"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addDisc}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDescipline;