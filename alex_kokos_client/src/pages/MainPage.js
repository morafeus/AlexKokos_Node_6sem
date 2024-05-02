import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Card, Button, Row, Dropdown} from "react-bootstrap";
import { Context } from "..";
import CourseList from "../components/CourseList";
import FilterBar from "../components/FilterBar";
import { fetchCourses } from "../http/courseAPI";
import { fetchDesciplines } from "../http/desciplineAPI";
let model;

const MainPage = observer(() => {
    const {descipline} = useContext(Context);
    const {courses} = useContext(Context);
    const [price,setPrice] = useState(1)
    const descip = 0;
    const name = "";

    useEffect(() => {
        fetchDesciplines().then(data => descipline.setDesciplines(data))
        fetchCourses(price, descip, name).then(data => courses.setCourses(data))
    }, [])

    return (
       <Container>
        <Row md={2}>
            <FilterBar/>
        </Row>
        <Row md={10}>
            <CourseList/>
        </Row>
       </Container>
      );
});

export default MainPage;