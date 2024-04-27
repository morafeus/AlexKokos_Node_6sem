import React, { useContext, useState } from "react";
import { Form, Modal, Button, Dropdown } from "react-bootstrap";
import { Context } from "../../index";


const CreateTeacher =({show, onHide}) => {
    const {descipline} = useContext(Context);
    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
        <Modal.Header>
            <Modal.Title id="containted-modal-title-vcenter">Add Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control className="m-2" placeholder={"input Teacher fio"}/>
                <Form.Control className="m-2"  placeholder={"input Teacher email"} type="email"/>
                <Form.Control className="m-2"  placeholder={"input Teacher password"}/>
                <Dropdown className="m-2">
                    <Dropdown.Toggle>Choose Descipline</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {descipline.desciplines.map(desc => 
                            <Dropdown.Item key={desc.descipline_id}>{desc.descipline_name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Close</Button>
            <Button variant="outline-success" onClick={onHide}>Add</Button>
        </Modal.Footer>
    </Modal>
    );
};

export default CreateTeacher;