import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Container, Form, Card, Button, Row} from "react-bootstrap";
import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import { Context } from "..";
import { signin, registration } from "../http/userAPI";
import {LOGIN_ROUTE, MAIN_ROUTE, REGESTRATE_ROUTE} from '../utils/consts'

const Auth = observer(() => {
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user} = useContext(Context);

    const click = async () =>{
        let data;
        try{
            if(isLogin)
            {
                data = await signin(login, password);
                user.setUser(data);
                user.setIsAuth(true);
                history(MAIN_ROUTE);
            }
            else 
            {
                const response = await registration(login, password, email);
                console.log(response);
                history(LOGIN_ROUTE);
            }
        }
        catch(e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card syle={{width:700}} className="p-5">
                <h2 style={{width:400}} className="m-auto">{isLogin ? 'Autorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                   
                    {isLogin ?
                    <div>
                     <Form.Control className="mt-2" placeholder="login" value={login} onChange={e => setLogin(e.target.value)}/>
                     <Form.Control className="mt-2" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                     </div>
                     :
                     <div>
                     <Form.Control className="mt-2" placeholder="login" value={login} onChange={e => setLogin(e.target.value)}/>
                     <Form.Control className='mt-2' placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                     <Form.Control className="mt-2" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                     </div>
                      }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? 
                            <div>
                                Do not have an account yet? <NavLink to={REGESTRATE_ROUTE}>SignUp</NavLink>
                            </div>
                            :
                            <div>
                                Already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }
                     
                        <Button className="mr-2" onClick={click}> {isLogin ? 'login' : 'registrate' }</Button>
                    </Row>
                
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;