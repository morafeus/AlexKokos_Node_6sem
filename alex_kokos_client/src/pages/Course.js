import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchCourses, fetchOneCourse } from "../http/courseAPI";

const Course = () => {
    const [course, setCourse] = useState({})
    const params = useParams();
    useEffect(() => {
        fetchOneCourse(params.id).then(data => setCourse(data))
 
    }, []);

    return (
        <Container className="mt-3" >
            <Row>
                <Col md={12}>
                    <Card className="m-1" >
                        <Card.Body>
                            <Card.Title style={{fontSize:35}}>{course.course_name}</Card.Title>
                            <Card.Text className="align-left" style={{fontSize:25}}>{course.course_description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={5} >
                    <Card className="m-1">
                        <Card.Body>
                        <Card.Title>{course.TeacherToCourse && course.TeacherToCourse[0]?.Teachers.fio}</Card.Title>
                        <Card.Text className="align-left">{course.TeacherToCourse && course.TeacherToCourse[0]?.Teachers.Desciplines?.descipline_name}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="m-1 d-flex-column">
                        <Card.Title className="m-2">Test List:</Card.Title>
                        <Card.Body>
                        {course.Tests && course.Tests.map((test, index) => 
                        <Row key={test.test_id} style={{background: index % 2 === 0 ? '#f8f9fa' : 'transparent', padding: 1}}>
                            {test.test_name} : {test.test_desc}
                        </Row>
                        )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="align-items-end">
                <Container className="d-flex justify-content-end align-items-center">
                    <lable className="mr-2" style={{fontSize:25}}>Cost: {course.course_cost}</lable>
                    <Button>Buy</Button>
                </Container>
            </Row>
            
        </Container>
    )
}

export default Course;