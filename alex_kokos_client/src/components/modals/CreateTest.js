import React, { useContext, useState } from "react";
import { Form, Modal, Button, Dropdown, Col, Row } from "react-bootstrap";
import { addTest } from "../../http/courseAPI";
import { Context } from "../../index";

const CreateTest = ({ show, onHide, courseId }) => {
  const { descipline } = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: ["", ""], answer_right: "", number: Date.now() }]);
  };

  const removeQuestion = (number) => {
    setQuestions(questions.filter((i) => i.number !== number));
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push("");
    setQuestions(updatedQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] = value;
  
    setQuestions(updatedQuestions);
  };

  const handleTestNameChange = (value) => {
    setTestName(value);
  };

  const handleTestDescriptionChange = (value) => {
    setTestDescription(value);
  };

  const handleAddClick = () => {
    const allFieldsFilled = questions.every((question) => {
      return question.text !== "" && question.answers.every((answer) => answer !== "");
    });
    const testNameFilled = testName !== "";
    const testDescriptionFilled = testDescription !== "";
  
    if (allFieldsFilled && testNameFilled && testDescriptionFilled) {
        const test = {
            testName: testName,
            testDescription: testDescription,
            questions: questions,
          };
          
          console.log(courseId);
        addTest(test, +courseId).then(data => {
           // setQuestions([]);
           // setTestName("");
            //setTestDescription("");
            onHide();
        })

        
    } else {
      alert('insert values in every field');
    }
  };



  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="containted-modal-title-vcenter">Add Teacher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control className="m-2" placeholder="Input Test name" value={testName} onChange={(e) => handleTestNameChange(e.target.value)} />
          <Form.Control className="m-2" placeholder="Input Test description" value={testDescription} onChange={(e) => handleTestDescriptionChange(e.target.value)} />
          <hr />
          
          {questions.map((question, questionIndex) => (
            <div key={question.number}>
              <Row className="m-1">
                <Col md={4}>
                  <Form.Control
                    placeholder="Question"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Right answer"
                    value={question.answer_right}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[questionIndex].answer_right = e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                  />
                </Col>
                <Col md={4}>
                  <Button variant="outline-danger" onClick={() => removeQuestion(question.number)}>
                    Delete Question
                  </Button>
                </Col>
              </Row>
              <Row className="m-1">
                <Col md={12}>
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="d-flex m-1">
                      <Form.Control
                        className="w-75 ml-1"
                        placeholder={`Answer ${answerIndex + 1}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() => removeAnswer(questionIndex, answerIndex)}
                        className="ml-2"
                      >
                        Delete Answer
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addAnswer(questionIndex)}>Add Answer</Button>
                </Col>
              </Row>
              <hr />
            </div>
          ))}
          <Button onClick={addQuestion}>Add Question</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={handleAddClick}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTest;