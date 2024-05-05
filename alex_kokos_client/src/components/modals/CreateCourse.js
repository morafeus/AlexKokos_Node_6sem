import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form, Modal, Button, Dropdown } from "react-bootstrap";
import { createCourse } from "../../http/courseAPI";
import { fetchDesciplines } from "../../http/desciplineAPI";
import { fetchTeachersByDesc } from "../../http/teacherAPI";
import { Context } from "../../index";

const CreateCourse = observer(({ show, onHide }) => {
  const { descipline } = useContext(Context);
  const {teachers} = useContext(Context);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchDesciplines().then((data) => descipline.setDesciplines(data));
  }, []);

  useEffect(() => {
    try{
      fetchTeachersByDesc(descipline.selectedType.descipline_id != null ? descipline.selectedType.descipline_id + 1 : 0).then((data) =>{ 
        teachers.setTeachers(data)
      });
    }
    catch(e){
      console.log(e);
    }
  }, [descipline.selectedType]);

  const addCourse = () => {
    try {
      createCourse(name, +cost, description, +descipline.selectedType.descipline_id, teachers.selectedType.user_ident).then(data => {
         setName('');
        setCost('');
        setDescription('');
        descipline.setSelectedType({})
        teachers.setTeachers([]);
        teachers.setSelectedType({})
        onHide();
      });
     
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="containted-modal-title-vcenter">Add Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="m-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"input course name"}
          />
          <Form.Control
            className="m-2"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder={"input course cost"}
            type="number"
          />
          <Form.Control
            className="m-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"input course description"}
            as="textarea"
          />
          <Dropdown className="m-2">
            <Dropdown.Toggle>
              {descipline.selectedType.descipline_name || "Choose Descipline"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {descipline.desciplines.map((desc) => (
                <Dropdown.Item
                  onClick={() => descipline.setSelectedType(desc)}
                  key={desc.descipline_id}
                >
                  {desc.descipline_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="m-2">
            <Dropdown.Toggle>
              {teachers.selectedType.fio || "Choose Teacher"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {teachers.teachers.map((desc) => (
                <Dropdown.Item
                  onClick={() => teachers.setSelectedType(desc)}
                  key={desc.user_ident}
                >
                  {desc.fio}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addCourse}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCourse;