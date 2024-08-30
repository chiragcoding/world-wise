/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";
import { useAuth } from "../contexts/FakeAuthContex"
import { useEffect } from "react";

function ProtectedRoute({children}) {

    const{isAuthenticated}=useAuth();
    const navigate=useNavigate();

    useEffect(function(){
        if(!isAuthenticated)
        {
            navigate("/")
        }
    },[isAuthenticated,navigate])

    return isAuthenticated? children :null;
}

export default ProtectedRoute
