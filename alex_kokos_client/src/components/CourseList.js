import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import { Context } from '..';
import CourseItem from './CourseItem';

const CourseList = observer(() =>{
    const {courses} = useContext(Context);
    console.log(courses);
    return (
        <Row className='d-flex'>
            {courses.courses.map(course => 
                <CourseItem key={course.course_id} course={course}/>
            )}
        </Row>
    );
});

export default CourseList;