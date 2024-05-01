import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Form, Card, Button, Row, Dropdown} from "react-bootstrap";
import { Context } from "..";
import CourseList from "../components/CourseList";
import FilterBar from "../components/FilterBar";
import { fetchDesciplines } from "../http/desciplineAPI";
let model;

const MainPage = observer(() => {
    const {descipline} = useContext(Context);

    useEffect(() => {
        fetchDesciplines().then(data => descipline.setDesciplines(data))
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