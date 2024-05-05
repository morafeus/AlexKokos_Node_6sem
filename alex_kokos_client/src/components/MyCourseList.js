import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import { Context } from '..';
import MyCourseItem from './MyCourseItem';

const MyCourseList = observer(() =>{
    const {courses} = useContext(Context);
    return (
        <Row className='d-flex'>
            {courses.courses.map(course => 
                <MyCourseItem key={course.course_id} course={course}/>
            )}
        </Row>
    );
});

export default MyCourseList;