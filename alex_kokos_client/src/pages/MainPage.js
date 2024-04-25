import React from "react";
import { Container, Form, Card, Button, Row, Dropdown} from "react-bootstrap";
import FilterBar from "../components/FilterBar";
let model;

const MainPage = () => {
    return (
       <Container>
        <Row md={2}>
            <FilterBar/>
        </Row>
        <Row md={10}>

        </Row>
       </Container>
      );
};

export default MainPage;