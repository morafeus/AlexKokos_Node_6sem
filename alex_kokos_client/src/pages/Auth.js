import React from "react";
import { Container, Form, Card, Button, Row} from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import {LOGIN_ROUTE, REGESTRATE_ROUTE} from '../utils/consts'

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card syle={{width:700}} className="p-5">
                <h2 style={{width:400}} className="m-auto">{isLogin ? 'Autorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                   
                    {isLogin ?
                    <div>
                     <Form.Control className="mt-2" placeholder="login"/>
                     <Form.Control className="mt-2" placeholder="password"/>
                     </div>
                     :
                     <div>
                     <Form.Control className="mt-2" placeholder="login"/>
                     <Form.Control className='mt-2' placeholder="email"/>
                     <Form.Control className="mt-2" placeholder="password"/>
                     </div>
                      }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? 
                            <div>
                                Do not have an account yet?<NavLink to={REGESTRATE_ROUTE}>SignUp</NavLink>
                            </div>
                            :
                            <div>
                                Already have an account?<NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }
                     
                        <Button > {isLogin ? 'login' : 'registrate' }</Button>
                    </Row>
                
                </Form>
            </Card>
        </Container>
    )
}

export default Auth;