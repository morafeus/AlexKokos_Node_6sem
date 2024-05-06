import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import { buyCourse, checkIsMy, fetchCourses, fetchOneCourse } from "../http/courseAPI";
import { deleteCourse } from "../http/courseAPI";
import { MAIN_ROUTE } from "../utils/consts";

const Course = () => {
    const {user} = useContext(Context);
    const [course, setCourse] = useState({})
    const {courses} = useContext(Context);
    const [check, setCheck] = useState(0)
    const params = useParams();
    const history = useNavigate();
    useEffect(() => {
        try{
        fetchOneCourse(params.id).then(data => setCourse(data))
        if(user.user.role === 'student')
        {
            checkIsMy(params.id).then(data => {
                if(data.data.course_id == params.id)
                setCheck(1)
            })
        }
        }
        catch(e){
            console.log(e);
        }
    }, []);

    const buyNew = () => {
        try
        {
            buyCourse(course.course_id)
            setCheck(1)

        }
        catch(e){
            history(MAIN_ROUTE);
            console.log(e);
        }
    }

    const DeleteCourse = () => {
        deleteCourse(course.course_id);
        fetchCourses(0, 0, '', 1, 8).then(data => {
            courses.setCourses(data.courses)
            courses.setTotalCount(data.count);
        })
        history(MAIN_ROUTE);
    }

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
            {user.user.role == 'admin' && 
            <Row>
                <Button variant="danger" onClick={DeleteCourse}>DELETE</Button>
            </Row>
            }
            {user.user.role == 'student' && check === 0 && 
            <Row className="align-items-end">
                <Container className="d-flex justify-content-end align-items-center">
                    <lable className="mr-2" style={{fontSize:25}}>Cost: {course.course_cost}</lable>
              
                        <Button onClick={() => buyNew()}>Buy</Button>
                    
                </Container>
            </Row>
            }
          
            
        </Container>
    )
}

export default Course;