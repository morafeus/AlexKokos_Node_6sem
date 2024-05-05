
import { Form, Modal, Button, Container } from "react-bootstrap";
import { createDescipline } from "../../http/desciplineAPI";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { createCourse, delMaterial, getMaterial } from "../../http/courseAPI";
import { fetchDesciplines } from "../../http/desciplineAPI";
import { fetchTeachersByDesc } from "../../http/teacherAPI";
import { Context } from "../../index";

const Material =({show, onHide, materialId}) => {
    const [value, setValue] = useState({})
    const { user } = useContext(Context);
  
    useEffect(() => {
        if(show){
        getMaterial(materialId).then(data => {
            setValue(data.data)})
        }
      }, [show]);

      const deleteMat = () => {
        delMaterial(materialId);
        onHide();
      }

    return (
        <Modal show = {show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="containted-modal-title-vcenter">{value.material_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {value.material_ingo}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {user.user.role == "teacher" && 
                <Button variant="danger" onClick={deleteMat}>DELETE</Button>
                }
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Material;