import { Form, Modal, Button, Container, Row } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { DelTest, GetStudsByTest, GetTest, SaveSuccess } from "../../http/courseAPI";
import { Context } from "../../index";

const TestPage = ({ show, onHide, courseId }) => {
  const [value, setValue] = useState({});
  const [test, setTest] = useState({});
  const { user } = useContext(Context);

  useEffect(() => {
    console.log(user.user.role);
    if (show) {
      if (user.user.role === "teacher") {
        GetStudsByTest(courseId).then((data) => {
          setValue(data.data);
        });
      }
      if (user.user.role === "student") {
        GetTest(courseId).then((data) => {
          setTest(data.data);
        });
      }
    }
  }, [show]);

  const deleteTest = () => {
    DelTest(courseId);
    onHide();
  }

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const updatedTest = { ...test };
    updatedTest.Answers[questionIndex].selectedAnswerIndex = answerIndex;
    setTest(updatedTest);
  };

  const handleSubmit = () => {
    const isAllAnswersCorrect = test.Answers.every((answer) => {
      return answer.selectedAnswerIndex === answer.answer_right;
    });

    if (isAllAnswersCorrect) {
      SaveSuccess(courseId);
      alert("Поздравляем! Вы ответили правильно на все вопросы.");
      onHide()
    } else {
      alert(
        "У вас есть неправильные ответы. Пожалуйста, проверьте свои ответы и попробуйте еще раз."
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="containted-modal-title-vcenter">
          {value[0]?.Tests?.test_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user.user.role === "student" && (
          <Container>
            {test.Answers &&
              test.Answers.map((answer, questionIndex) => (
                <div key={answer.answer_id} className="mb-4">
                  <h4>{answer.question}</h4>

                  {answer.answers.split("&").map((choice, answerIndex) => (
                    <Form.Check
                      key={answerIndex}
                      type="radio"
                      id={`question-${questionIndex}-answer-${answerIndex}`}
                      label={choice}
                      name={`question-${questionIndex}`}
                      onChange={() =>
                        handleAnswerChange(questionIndex, answerIndex)
                      }
                    />
                  ))}
                </div>
              ))}
          </Container>
        )}
        {user.user.role === "teacher" && (
          <Container>
            {Array.isArray(value) &&
              value.map((item, index) => (
                <Row
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#f8f9fa" : "transparent",
                    padding: 1,
                  }}
                >
                  {item.Students.user_ident}. {item.Students.fio}
                </Row>
              ))}
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        {user.user.role === "teacher" && (
          <Button variant="danger" onClick={deleteTest}>
            DELETE
          </Button>
        )}
        {user.user.role === "student" && (
          <Button variant="outline-success" onClick={handleSubmit}>
            Add
          </Button>
        )}
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TestPage;