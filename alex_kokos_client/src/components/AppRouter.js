import  { React,  useContext}  from "react";
import {Route, Redirect, Routes, Navigate} from 'react-router-dom'
import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
        <div>
        <Routes>
            {user._isAuth && authRoutes.map(({path, Component}) => 
                <Route key = {path} path={path} Component={Component}/>
            )}
             {publicRoutes.map(({path, Component}) => 
                <Route key = {path} path={path} Component={Component}/>
            )}
            <Route path="*" element={<Navigate to ={MAIN_ROUTE} />}/>
        </Routes>
        
        </div>
    )
})

export default AppRouter;