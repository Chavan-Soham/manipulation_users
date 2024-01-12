import { useState } from "react"
import supabase from "../supabaseClient"
import { Link, useNavigate } from "react-router-dom"
import $ from "jquery"
import React from "react"

export function IfNotName() {
    const navigate = useNavigate()
    const [name_of_team, setTeamName] = useState([])
    const [clickedTeam, setClickedTeam] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    async function checkNameExistsOrNot() {
        const getId = await supabase.auth.getUser()
        const user_id = getId.data.user.id;

        const { data, error } = await supabase
            .from('users')
            .select('user_name')
            .eq('user_id', user_id)
        if (error) {
            console.log(error)
        }

        if (data) {
            const usernames = data.map(user => user.user_name).join(', ');
            console.log(usernames)
            if (usernames === "") {
                async function newUserName() {
                    let newname = prompt("Welcome To CCA, enter your name:")
                    const getId = await supabase.auth.getUser()
                    const user_id = getId.data.user.id;
                    const { error } = await supabase
                        .from("users")
                        .insert([
                            { user_name: newname, created_at: new Date().toISOString(), user_id: user_id }
                        ])
                    if (error) {
                        console.log(error)
                    }
                }
                newUserName()
            }
        }
    }

    async function setTeams() {
        const getId = await supabase.auth.getUser()
        const user_id = getId.data.user.id;
        const { data, error } = await supabase
            .from('team_name')
            .select('team_name, created_by')
            .eq('created_by', user_id)
        if (error) {
            console.log(error)
        }
        if (data && data.length > 0) {
            setTeamName(data)
        }
    }

    async function getTeams() {
        setTeams()
        for (let index = 0; index < name_of_team.length; index++) {
            const element = name_of_team[index];
            console.log(element.team_name)
        }
    }

    async function deleteTeam(NameOfTeam, index) {
        const getId = await supabase.auth.getUser()
        const user_id = getId.data.user.id
        console.log(NameOfTeam)
        const { error } = await supabase
            .from('team_name')
            .delete()
            .eq("team_name", NameOfTeam)
            .eq("created_by", user_id)

        if (error) {
            console.log(error)
        }
        $(`#class-${index}`).hide()
    }

    async function getState() {
        if (clickedTeam) {
            navigate("/dashboard", { state: { clickedTeam } });
        }
    }

    const handleUpload = async () => {
        

        if (!file) {
          alert('Please select an image before uploading.');
          return;
        }
      
        try {
          const { data, error } = await supabase.storage
            .from('images')
            .upload(`images/${file.name}`, file, { public: true });
      
          if (error) {
            console.error('Error uploading image:', error.message);
          } else {
            console.log('Image uploaded successfully:', data);
            alert('Image uploaded successfully!');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      

    return (
        <div>
            <h1>hi</h1>
            <button onClick={checkNameExistsOrNot}>Click</button>
            <Link to="/createOrJoin">
                <button>Let's go</button>
            </Link>
            <button onClick={async () => {
                await supabase.auth.signOut();
                navigate("/")
            }}>Sign out</button>
            <button onClick={getTeams}>Click to retrieve</button>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Image</button>
            </div>
            <div>
                {name_of_team.map((team, index) => (

                    <div key={index} id={`class-${index}`}><a onClick={async () => {
                        setClickedTeam(team.team_name);
                    }} {...getState()}>{team.team_name}</a><button>Edit</button><button onClick={() => { deleteTeam(team.team_name, index); setClickedTeam(null) }}>Delete</button></div>
                ))}

            </div>
        </div>
    );
}