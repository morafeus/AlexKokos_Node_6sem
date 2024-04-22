import  { React,  useContext}  from "react";
import {Route, Redirect, Routes, Navigate} from 'react-router-dom'
import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";


const AppRouter = () => {
    const {user} = useContext(Context);
    user.setIsAuth(true);
    return (
        <div>
        <Routes>
            {user._isAuth && authRoutes.map(({path, Component}) => 
                <Route key = {path} path={path} exact element={<Component/>}/>
            )}
             {publicRoutes.map(({path, Component}) => 
                <Route key = {path} path={path} exact  element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to ={MAIN_ROUTE} />}/>
        </Routes>
        
        </div>
    )
}

export default AppRouter;