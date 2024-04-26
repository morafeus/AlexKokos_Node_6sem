import React from "react";
import { Container, Form, Card, Button, Row, Dropdown} from "react-bootstrap";
import CourseList from "../components/CourseList";
import FilterBar from "../components/FilterBar";
let model;

const MainPage = () => {
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
};

export default MainPage;