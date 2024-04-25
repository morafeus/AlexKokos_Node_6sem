import {React, useContext } from "react";
import { NavLink, Link} from "react-router-dom";
import { Context } from "../index";
import { MAIN_ROUTE, MY_MAIN_ROUTE, MY_PROFILE } from "../utils/consts";
import {Button, Navbar} from 'react-bootstrap'
import { observer } from "mobx-react-lite";

const NavBar =  observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand mb-0 h1" to={MAIN_ROUTE}>AlexKokos</NavLink>
           
                
                {user.isAuth ? 
                 <div className="collapse navbar-collapse"  id="navbarNav">
                <ul className="navbar-nav">
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
                </nav>
                </ul>
                </div>
                :
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <nav>
                <li className="nav-item active">
                    <Link className="nav-link" to={MAIN_ROUTE}>Home <span className="sr-only">(current)</span></Link>
                </li>
                </nav>
                </ul>
                </div>
                }
                
            
            {user.isAuth ? 
                <Button>LogOUT</Button>
                :
                <Button onClick={() => user.setIsAuth(true)}>LogIN</Button>
            }
        </Navbar>
    )
})

export default NavBar;