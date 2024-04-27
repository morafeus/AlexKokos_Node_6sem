import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateDescipline from "../components/modals/CreateDescipline"
import CreateTeacher from "../components/modals/CreateTeacher"
import CreateCourse from "../components/modals/CreateCourse"
import CreateTest from "../components/modals/CreateTest";

const Admin = () => {
    const [courseVisible, setCourseVisible] = useState(false);
    const [teacherVisible, setTeacherVisible] = useState(false);
    const [desciplineVisible, setDesciplineVisible] = useState(false);
    return (
        <Container className="d-flex flex-column">
            <Button className="mt-4 p-2" onClick={() => setCourseVisible(true)}>Add Course</Button>
            <Button className="mt-4 p-2" onClick={() => setTeacherVisible(true)}>Add Teacher</Button>
            <Button className="mt-4 p-2" onClick={() => setDesciplineVisible(true)}>Add Descipline</Button>
            <CreateDescipline show={desciplineVisible} onHide={() => setDesciplineVisible(false)}/>
            <CreateCourse show={courseVisible} onHide={() => setCourseVisible(false)}/>
            <CreateTeacher show={teacherVisible} onHide={() => setTeacherVisible(false)}/>
          
        </Container>
    )
}

export default Admin;