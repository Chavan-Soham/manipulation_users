import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";


export function Login(){
    const navigate = useNavigate()
    supabase.auth.onAuthStateChange(async(event)=>{
        if (event === "SIGNED_IN") {
            navigate("/second");
        }
    })

    return(
        <div>
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                theme="dark"
            />
        </div>
    );
}