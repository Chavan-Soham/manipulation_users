import { createBrowserRouter } from "react-router-dom"
import { IfNotName } from "./name_page(check)/name"
import { Login } from "./authorize";
import { CreateOrJoin } from "./createOrJoin/createOrJoin";
import { CreateIfNotExists } from "./createOrJoin/create";
import { Main } from "./dashboard/main";
import { Join } from "./createOrJoin/join";



const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <Login/>,
            index: true
        },
        {
            path:"/second",
            element:<IfNotName />,
        },
        {
            path:"/createOrJoin",
            element:<CreateOrJoin/>
        },
        {
            path:"/create",
            element:<CreateIfNotExists/>
        },
        {
            path:"/dashboard",
            element:<Main/>
        },
        {
            path:"/join",
            element:<Join/>
        }
    ]
)

export default routes;