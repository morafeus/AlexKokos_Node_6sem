import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Card, Button, Row, Dropdown} from "react-bootstrap";
import { Context } from "..";
import MyCourseList from "../components/MyCourseList";
import FilterBar from "../components/FilterBar";
import Pages from "../components/Pages";
import { fetchCourses, fetchCoursesUser } from "../http/courseAPI";
import { fetchDesciplines } from "../http/desciplineAPI";

const My_main = observer(() => {
    const {descipline} = useContext(Context);
    const {courses} = useContext(Context);


    useEffect(() => {
        try {
            fetchDesciplines().then(data => descipline.setDesciplines(data))
            fetchCoursesUser(0, 0, '', 1, 8).then(data => {
                courses.setCourses(data.courses)
                courses.setTotalCount(data.count);
            })
        }
        catch(e){
            console.log(e);
        }
    }, [])

    useEffect(()=> {
        try{
            fetchCoursesUser(courses.price  ,  courses.selectedDescipline.descipline_id != null ? +courses.selectedDescipline.descipline_id + 1 : 0 , courses.name, courses.page, 8).then(data => {
                courses.setCourses(data.courses)
                courses.setTotalCount(data.count);
            })
        }
        catch(e){
            console.log(e);
        }
    }, [courses.page, courses.price, courses.selectedDescipline, courses.name])

    return (
       <Container>
        <Row md={2}>
            <FilterBar/>
        </Row>
        <Row md={10}>
            <MyCourseList/>
            <Pages/>
        </Row>
       </Container>
      );
});

export default My_main