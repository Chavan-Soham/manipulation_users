import { Link } from "react-router-dom";

export function CreateOrJoin(){

    return(
        <div>
            <Link to="/create">
            <button>Create</button>
            </Link>
            <Link to="/join">
            <button>Join</button>
            </Link>
        </div>
    );
}