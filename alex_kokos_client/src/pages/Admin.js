import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import CreateDescipline from "../components/modals/CreateDescipline"
import CreateTeacher from "../components/modals/CreateTeacher"
import CreateCourse from "../components/modals/CreateCourse"
import CreateTest from "../components/modals/CreateTest";
import { deleteUser } from "../http/courseAPI";

const Admin = () => {
    const [courseVisible, setCourseVisible] = useState(false);
    const [teacherVisible, setTeacherVisible] = useState(false);
    const [desciplineVisible, setDesciplineVisible] = useState(false);

    const [name, setName] = useState('');

    const DeleteUser = () => {
        deleteUser(name)
        setName('');
    }

    return (
        <Container className="d-flex flex-column">
            <Button className="mt-4 p-2" onClick={() => setCourseVisible(true)}>Add Course</Button>
            <Button className="mt-4 p-2" onClick={() => setTeacherVisible(true)}>Add Teacher</Button>
            <Button className="mt-4 p-2" onClick={() => setDesciplineVisible(true)}>Add Descipline</Button>
            <CreateDescipline show={desciplineVisible} onHide={() => setDesciplineVisible(false)}/>
            <CreateCourse show={courseVisible} onHide={() => setCourseVisible(false)}/>
            <CreateTeacher show={teacherVisible} onHide={() => setTeacherVisible(false)}/>
            <Row className="m-2">
                <Col md={6}>
                    <Form.Control
                            className="m-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={"input username to delete"}
                        />
                </Col>
                <Col md={6}>
                    <Button onClick={DeleteUser}>DELETE</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin;