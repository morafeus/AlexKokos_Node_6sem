import React from "react";
import { Container, Card, Button, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";

const Course = () => {
    const course = {  course_id : 1,course_name: 'math', course_cost: 300, course_description: 'hello course', course_descipline: 'Math'}
    const teacher = {user_ident: 1, fio: "alex", email:"teacher@gmail.com", descipline: "Math"}
    const tests = [
        {  test_id : 1,test_name: 'math', course_cost: 300, test_desc: 'hello course', course_descipline: 'Math'},
        {  test_id : 2,test_name: 'math1', course_cost: 100, test_desc: 'hello course', course_descipline: 'Math'},
        {  test_id : 3,test_name: 'math2', course_cost: 700, test_desc: 'hello course', course_descipline: 'Math'},
        {  test_id : 4,test_name: 'math3', course_cost: 400, test_desc: 'hello course', course_descipline: 'Math'},
    ] 
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
                            <Card.Title>{teacher.fio}</Card.Title>
                            <Card.Text className="align-left">{teacher.descipline}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="m-1 d-flex-column">
                        <Card.Title className="m-2">Test List:</Card.Title>
                        <Card.Body>
                            {tests.map((test, index) => 
                                <Row key={test.test_id} style={{background: index % 2 === 0 ? '#f8f9fa' : 'transparent', padding: 1}} >
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