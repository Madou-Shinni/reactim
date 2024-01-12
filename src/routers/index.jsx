import React from "react";
import {Navigate, useRoutes} from "react-router-dom";

import Home from "../view/home/Home.jsx";


const Router = React.memo(()=>{
    const element = useRoutes(
        [
            {
                path:'/:id',
                element: <Home/>,
            },
            {
                path:'*',
                element: <Navigate to={'/777'}/>
            },
        ]
    )
    return element
})

export default Router