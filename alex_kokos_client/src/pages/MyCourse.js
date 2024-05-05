import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import CreateMaterial from "../components/modals/CreateMaterial";
import CreateTest from "../components/modals/CreateTest";
import Material from "../components/modals/Material";
import TestPage from "../components/modals/TestPage";
import { fetchOneCourseMy } from "../http/courseAPI";

const MyCourse = observer(() => {
  const { user } = useContext(Context);
  const { courses } = useContext(Context);
  const [course, setCourse] = useState({});
  const [check, setCheck] = useState(0);
  const params = useParams();

  const [testVisible, setTestVisible] = useState(false);
  const [materialVisible, setMaterialVisible] = useState(false);
  const [viewTestVisible, setViewTestVisible] = useState(false);
  const [viewMaterialVisible, setViewMaterialVisible] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    try {
      fetchOneCourseMy(params.id).then((data) => {
        courses.setMyCourse(data);
      });
      fetchOneCourseMy(params.id).then((data) => setCourse(data));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const viewMat = (id) => {
    setSelectedMaterialId(id);
    setViewMaterialVisible(true);
  };

  const viewTest = (id) => {
    setSelectedTestId(id);
    setViewTestVisible(true);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={12}>
          <Card className="m-1">
            <Card.Body>
              <Card.Title style={{ fontSize: 35 }}>{course.course_name}</Card.Title>
              <Card.Text className="align-left" style={{ fontSize: 25 }}>
                {course.course_description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <Card className="m-1 d-flex-column">
            <Card.Title className="m-2">Material List:</Card.Title>
            <Card.Body>
                {course.Materials ? (
                    course.Materials.map((material, index) => (
                    <Row
                        key={material.material_id}
                        style={{
                        background: index % 2 === 0 ? "#f8f9fa" : "transparent",
                        padding: 1,
                        cursor: "pointer",
                        }}
                        onClick={() => viewMat(material.material_id)}
                    >
                        {material.material_name}
                    </Row>
                    ))
                ) : (
                    <div>Loading materials...</div>
                )}
                </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Card className="m-1 d-flex-column">
            <Card.Title className="m-2">Test List:</Card.Title>
            <Card.Body>
            {course.Tests ? (
                course.Tests.map((test, index) => (
                <Row
                    key={test.test_id}
                    style={{
                    background: index % 2 === 0 ? "#f8f9fa" : "transparent",
                    padding: 1,
                    }}
                    onClick={() => viewTest(test.test_id)}
                >
                    {test.test_name} : {test.test_desc}
                </Row>
                ))
            ) : (
                <div>Loading tests...</div>
            )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {user.user.role === "teacher" ? (
        <Row className="align-items-end d-flex">
          <Card className="m-1 d-flex">
            <Card.Body>
              <Card.Title>
                {course.TeacherToCourse &&
                  course.TeacherToCourse[0]?.Teachers.fio}
              </Card.Title>
              <Card.Text className="align-left">
                {course.TeacherToCourse &&
                  course.TeacherToCourse[0]?.Teachers.Desciplines?.descipline_name}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-1 d-flex">
            <Card.Body className="d-flex flex-column">
              <Button className="mt-4 p-2" onClick={() => setTestVisible(true)}>
                Add Test
              </Button>
              <Button className="mt-2 p-2" onClick={() => setMaterialVisible(true)}>
                Add Material
              </Button>
              <CreateTest
                show={testVisible}
                onHide={() => setTestVisible(false)}
                courseId={course.course_id}
              />
              <CreateMaterial
                show={materialVisible}
                onHide={() => setMaterialVisible(false)}
                courseId={course.course_id}
              />
           
            </Card.Body>
          </Card>
        </Row>
      ) : (
        <Row className="align-items-end d-flex">
          <Card className="m-1 d-flex">
            <Card.Body>
              <Card.Title>
                {course.TeacherToCourse &&
                  course.TeacherToCourse[0]?.Teachers.fio}
              </Card.Title>
              <Card.Text className="align-left">
                {course.TeacherToCourse &&
                  course.TeacherToCourse[0]?.Teachers.Desciplines?.descipline_name}
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      )}
         <Material
                show={viewMaterialVisible}
                onHide={() => setViewMaterialVisible(false)}
                materialId={selectedMaterialId}
              />
              <TestPage
                show={viewTestVisible}
                onHide={() => setViewTestVisible(false)}
                courseId={selectedTestId}
              />
    </Container>
  );
});

export default MyCourse;