import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {COURSE_ROUTE} from '../utils/consts'

const CourseItem = ({course}) =>{
    const history = useNavigate();
    return (
        <Container className="mt-1" onClick={() => history(COURSE_ROUTE + '/' + course.course_id)}>
            <a href="">
                <Card className="m-1" style={{ width: '70rem' }}>
                    <Card.Body>
                    <Card.Title>{course.course_name}</Card.Title>
                    <Card.Text className="align-left">{course.course_description}</Card.Text>
                    <div className="row justify-content-end">
                        <p className="card-link text-info col-2">Cost: {course.course_cost}</p>
                        <p className="card-link text col-2">Discipline: {course.course_descipline}</p>
                        <Button variant="danger" href="">
                        Delete
                        </Button>
                    </div>
                    
                        
                    
                    </Card.Body>
                </Card>
            </a>
        </Container>
    )
}

export default CourseItem;