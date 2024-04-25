import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from '..';

const CourseList = observer(() =>{
    const {courses} = useContext(Context);
    return (
        <ListGroup>
            
        </ListGroup>
    );
});

export default CourseList;