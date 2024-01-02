import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";



export function Join(){
    const [joinPass, setJoinPass] = useState();
    const [name, setName] = useState();
    const navigate = useNavigate()

    async function MatchPassAndInsert(){
        const {data, error} = await supabase   
            .from('team_name')
            .select('team_name, team_id')
            .match({password: joinPass})
        if (data) {
            const getId = await supabase.auth.getUser()
            const user_id = getId.data.user.id;
            const team_id = data.map(team_id =>team_id.team_id).join(',')
            const {error} = await supabase
                .from("team_members")
                .insert([
                    {member_joinedAt: new Date().toISOString(), member_id: user_id, member_teamId: team_id, member_name: name}
                ])
            if (error) {
                console.log(error)
            }
            else{
                navigate("/second")
            }
        }
        if (error) {
            console.log(error)
        }

    }

    async function NameOfUser(){
        const getId = await supabase.auth.getUser()
        const user_id = getId.data.user.id;
        const {data, error} = await supabase
        .from('users')
        .select('user_name')
        .eq('user_id', user_id)
        if (error) {
            console.log(error)
        }
        if (data) {
            const usernames = data.map(user => user.user_name).join(', ');
            setName(usernames)
        }
        
    }
    useEffect(()=>{
        NameOfUser()
    },[])

    return(
        <div>
            <input 
                name="join"
                value={joinPass}
                onChange={(event)=>setJoinPass(event.target.value)}
                placeholder="enter password"
                type="password"
                required
            />
            <br/>
            <button onClick={MatchPassAndInsert}>Join</button>
        </div>
    );
}