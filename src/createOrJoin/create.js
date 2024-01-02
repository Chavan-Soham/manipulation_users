import { useState } from "react";
import supabase from "../supabaseClient";


export function CreateIfNotExists(){
    const [teamName, setTeamName] = useState('')
    const [password, setTeamPassword] = useState('')

    async function insertTeamName(){
        const getId = await supabase.auth.getUser()
        const user_id = getId.data.user.id;
        const {error} = await supabase
            .from('team_name')
            .insert([
                {created_by: user_id, team_name: teamName, password: password}
            ])
        if (error) {
            console.log(error)
        }
    }
   
    return(
        <div>
            <label>Name: </label>
            <input 
                value={teamName}
                onChange={(event)=>setTeamName(event.target.value)}
                type="text"
                placeholder="Enter team name"
                required
            />
            <label>Password: </label>
            <input 
                value={password}
                onChange={(event)=>setTeamPassword(event.target.value)}
                type="password"
                placeholder="Enter team's code"
                required
            />
        <div>
            <button onClick={insertTeamName}>Submit</button>
        </div>
        </div>
    );
}