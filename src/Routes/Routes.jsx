import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/post/:id",
                element: <PostDetails></PostDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
            },
        ],
    },
])

