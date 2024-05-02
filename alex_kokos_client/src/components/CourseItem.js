import React, { useContext} from "react";
import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { Context } from "..";
import {COURSE_ROUTE} from '../utils/consts'

const CourseItem = ({course}) =>{
    const history = useNavigate();
    const {user} = useContext(Context);
   

    return (
        <Container className="mt-1" onClick={() => history(COURSE_ROUTE + '/' + course.course_id)}>
                <Card className="m-1" style={{ width: '70rem' }}>
                    <Card.Body>
                    <Card.Title>{course.course_name}</Card.Title>
                    <Card.Text className="align-left">{course.course_description}</Card.Text>
                    
                            <div className="row justify-content-end">
                            <p className="card-link text-info col-2">Cost: {course.course_cost}</p>
                            <p className="card-link text col-3">Discipline: {course.Desciplines.descipline_name}</p>
                            </div>

                    </Card.Body>
                </Card>
        </Container>
    )
}

export default CourseItem;