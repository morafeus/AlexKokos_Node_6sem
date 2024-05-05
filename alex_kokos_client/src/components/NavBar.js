import {React, useContext, useState } from "react";
import { NavLink, Link, useNavigate} from "react-router-dom";
import { Context } from "../index";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MY_MAIN_ROUTE, MY_PROFILE } from "../utils/consts";
import {Button, Container, Navbar} from 'react-bootstrap'
import { observer } from "mobx-react-lite";
import { logoutFunc} from "../http/userAPI";
import Chat from "./modals/Chat";


const NavBar =  observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate();

    const logout =async () => {
        user.setIsAuth(false);
        user.setUser({});
        await logoutFunc();
    }

    const [chatVisible, setChatVisible] = useState(false);
  

    return (
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
            <NavLink className="navbar-brand mb-0 h1" to={MAIN_ROUTE}>AlexKokos</NavLink>
           
                
             
                <div className="collapse navbar-collapse"  id="navbarNav">
                <ul className="navbar-nav">
                {user.user.role == 'student' && 
                    <nav className="navbar navbar-expand-lg">
                    <li className="nav-item active">
                        <Link className="nav-link" to={MAIN_ROUTE}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={MY_MAIN_ROUTE}>My Courses</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={MY_PROFILE}>Profile</Link>
                    </li>
                    <li className="nav-item active">
                            <Link className="nav-link" onClick={() => setChatVisible(true)}>Chat <span className="sr-only">(current)</span></Link>
                        </li>
                    </nav>
                }
                {user.user.role == 'teacher' && 
                    <nav className="navbar navbar-expand-lg">
                    <li className="nav-item active">
                        <Link className="nav-link" to={MAIN_ROUTE}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={MY_MAIN_ROUTE}>My Courses</Link>
                    </li>
                    <li className="nav-item active">
                            <Link className="nav-link" onClick={() => setChatVisible(true)}>Chat <span className="sr-only">(current)</span></Link>
                        </li>
                    </nav>
                }
                {user.user.role == 'admin' && 
                    <nav className="navbar navbar-expand-lg">
                        <li className="nav-item active">
                            <Link className="nav-link" to={MAIN_ROUTE}>Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" onClick={() => setChatVisible(true)}>Chat <span className="sr-only">(current)</span></Link>
                        </li>
                        
                    </nav>
                }
          
                
                </ul>
                </div>
              
                

            {user.user.role == 'admin' ? 
                <nav className="mr-3">
                    <Button variant={"outline_light"} onClick={() => history(ADMIN_ROUTE)}>Admin</Button>
                </nav>
                :
                <nav>
              <div className="mr-3"><h5>{user.user.fio}</h5></div>
              </nav>
            }
            
            {user.isAuth ? 
                <nav >
                   
                    <Button className="m-1" onClick={() => logout()}>LogOUT</Button>
                </nav>
                :
                <Button onClick={() => history(LOGIN_ROUTE)}>LogIN</Button>
            }
            <Chat show={chatVisible}
                onHide={() => setChatVisible(false)}/>
        </Navbar>
        
    )
})

export default NavBar;