
import { Sidebar } from "../components/Sidebar.js"
import {ChatBox} from "../components/ChatBox.js"
import { AuthContext } from "../pages/AuthContext";
import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
export const Home = () => {

    const { userData } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(userData);
        if(userData === "" || userData === undefined) {
            navigate("/")
        }


    },[userData])

    


    return (
        <div className="rowContainer" style={{maxWidth: "100vw", maxHeight: "100vh", minWidth: "100vw", minHeight: "100vh"}}>
            <Sidebar></Sidebar>
            <ChatBox></ChatBox>
        </div>
    )
}