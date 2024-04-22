import {React, useContext } from "react";
import { NavLink, Link} from "react-router-dom";
import { Context } from "../index";
import { MAIN_ROUTE, MY_MAIN_ROUTE, MY_PROFILE } from "../utils/consts";
import {Button, Navbar} from 'react-bootstrap'

const NavBar = () => {
    const {user} = useContext(Context)
    return (
        <Navbar class="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink class="navbar-brand mb-0 h1" to={MAIN_ROUTE}>AlexKokos</NavLink>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                {user.isAuth ? 
                <nav>
                <li class="nav-item active">
                    <Link class="nav-link" to={MAIN_ROUTE}>Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to={MY_MAIN_ROUTE}>My Courses</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to={MY_PROFILE}>Profile</Link>
                </li>
                </nav>
                :
                <nav>
                <li class="nav-item active">
                    <Link class="nav-link" to={MAIN_ROUTE}>Home <span class="sr-only">(current)</span></Link>
                </li>
                </nav>
                }
                </ul>
            </div>
            {user.isAuth ? 
                <Button>LogOUT</Button>
                :
                <Button>LogIN</Button>
            }
        </Navbar>
    )
}

export default NavBar;