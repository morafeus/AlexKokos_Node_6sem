import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form, Modal, Button, Dropdown } from "react-bootstrap";
import { fetchDesciplines } from "../../http/desciplineAPI";
import { createTeach } from "../../http/userAPI";
import { Context } from "../../index";


const CreateTeacher = observer(({show, onHide}) => {
    const [fio, setFio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {descipline} = useContext(Context);

    useEffect(() => {
        fetchDesciplines().then((data) => descipline.setDesciplines(data));
      }, []);

      const addTeacher = async () => {
        try {
          await createTeach(fio, email, password, +descipline.selectedType.descipline_id)
            setFio('');
            setEmail('');
            setPassword('');
            descipline.setSelectedType({})
            onHide();
          
         
        } catch (e) {
          alert(e);
        }
      };

    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
        <Modal.Header>
            <Modal.Title id="containted-modal-title-vcenter">Add Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control className="m-2"  value={fio} onChange={(e) => setFio(e.target.value)} placeholder={"input Teacher fio"}/>
                <Form.Control className="m-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"input Teacher email"} type="email"/>
                <Form.Control className="m-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"input Teacher password"}/>
                <Dropdown className="m-2">
                    <Dropdown.Toggle> {descipline.selectedType.descipline_name || "Choose Descipline"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {descipline.desciplines.map(desc => 
                            <Dropdown.Item 
                            onClick={() => descipline.setSelectedType(desc)}
                            key={desc.descipline_id}>{desc.descipline_name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={e => onHide()}>Close</Button>
            <Button variant="outline-success" onClick={e =>addTeacher()}>Add</Button>
        </Modal.Footer>
    </Modal>
    );
});

export default CreateTeacher;
