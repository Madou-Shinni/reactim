import React from "react";
import {Navigate, useRoutes} from "react-router-dom";

import Home from "../view/home/Home.jsx";
import Login from "@/view/home/Login.jsx";


const Router = React.memo(()=>{
    const element = useRoutes(
        [
            {
                path:'/login/github',
                element: <Login/>,
            },
            {
                path:'/home/:id',
                element: <Home/>,
            },
            {
                path:'*',
                element: <Navigate to={'/login/github'}/>
            },
        ]
    )
    return element
})

export default Router