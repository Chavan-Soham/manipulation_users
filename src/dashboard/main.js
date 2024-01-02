import React from "react";
import { useLocation } from "react-router-dom";

export function Main(){
    const location = useLocation();
    const getState = location.state.clickedTeam;

    
    return(
        <div>
            <h1>This is IfNotName data</h1>
            <h1>{getState}</h1>
        </div>
    );
}