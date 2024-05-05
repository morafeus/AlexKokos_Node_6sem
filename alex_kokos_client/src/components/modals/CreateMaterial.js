import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { Context } from "../..";
import { addMaterial } from "../../http/courseAPI";

const CreateMaterial = observer(({show, onHide, courseId}) => {
    const courses = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const addDisc = () => {
        try {
            addMaterial(courseId, name, description).then(data => {
                setName('');
                setDescription('');
                onHide();
            })
           
          } catch (e) {
            alert(e.response.data);
          }
    }


    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="containted-modal-title-vcenter">Add Material for course </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="m-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"input material name"}
                    />

                    <Form.Control
                        className="m-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"input info"}
                        as="textarea"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addDisc}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateMaterial;