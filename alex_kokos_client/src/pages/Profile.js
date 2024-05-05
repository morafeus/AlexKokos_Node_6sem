import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Row, Button, InputGroup } from "react-bootstrap";
import { getStudent, updateBalance } from "../http/userAPI";

const Profile = observer(() => {
    const [user, setUser] = useState({});
    const [balance, setBalance] = useState(0)

    useEffect( () => {
        try{
            getStudent().then(data => setUser(data.data));
        }
        catch(e){
            console.log(e);
          }
    }, [])

    const addBalance = () => {
        console.log(balance);
        if(balance > 0){
            try{
                updateBalance(balance).then(data=> setUser(data.data))
                setBalance(0);
            }
            catch(e){
                console.log(e);
            }
        }
    }

    return (
        <Container className="mt-3 justify-content-center align-items-center">
        <Row>
            <h2>hello, {user.fio}</h2>
        </Row>
        <Row>
            <h3>your balance is {user.balance}</h3>
        </Row>
        <Row>
            <InputGroup className="m-2">
                <Form.Control
                    style={{ width: "25%" }}
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="input money value"
                    type="number"
                />
                <Button variant="outline-success" onClick={addBalance}>
                    Pay
                </Button>
            </InputGroup>
        </Row>
    </Container>
        
    )
});

export default Profile