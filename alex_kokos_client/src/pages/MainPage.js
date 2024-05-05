import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Card, Button, Row, Dropdown} from "react-bootstrap";
import { Context } from "..";
import CourseList from "../components/CourseList";
import FilterBar from "../components/FilterBar";
import Pages from "../components/Pages";
import { fetchCourses } from "../http/courseAPI";
import { fetchDesciplines } from "../http/desciplineAPI";
let model;

const MainPage = observer(() => {
    const {descipline} = useContext(Context);
    const {courses} = useContext(Context);


    useEffect(() => {
        fetchDesciplines().then(data => descipline.setDesciplines(data))
        fetchCourses(0, 0, '', 1, 8).then(data => {
            courses.setCourses(data.courses)
            courses.setTotalCount(data.count);
        })
    }, [])

    useEffect(()=> {
        fetchCourses(courses.price  ,  courses.selectedDescipline.descipline_id != null ? +courses.selectedDescipline.descipline_id + 1 : 0 , courses.name, courses.page, 8).then(data => {
            courses.setCourses(data.courses)
            courses.setTotalCount(data.count);
        })
    }, [courses.page, courses.price, courses.selectedDescipline, courses.name])

    return (
       <Container>
        <Row md={2}>
            <FilterBar/>
        </Row>
        <Row md={10}>
            <CourseList/>
            <Pages/>
        </Row>
       </Container>
      );
});

export default MainPage;