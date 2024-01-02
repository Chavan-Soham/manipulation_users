import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import supabase from "../supabaseClient";

export function Main(){
    const location = useLocation();
    const getState = location.state.clickedTeam;
    const [names, setnames] = useState()

    async function getJoinedUsers(){
        const {data, error} = await supabase
            .from("team_name")
            .select("team_id")
            .eq("team_name", getState)
        if (!data) {
            console.log("team id not found")
        }

        if(data){
            const team_id = data.map(team_id=>team_id.team_id).join(",")
            if (!team_id) {
                console.log("team id is null")
            }
            if (team_id) {
                const {data: member_names, error: e} = await supabase
                    .from("team_members")
                    .select("member_name")
                    .eq("member_teamId", team_id)
                if (member_names) {
                    setnames(member_names)
                    console.log(member_names)
                }
            }
        }
    }
    
    return(
        <div>
            <h1>This is IfNotName data</h1>
            <h1>{getState}</h1>
        </div>
    );
}