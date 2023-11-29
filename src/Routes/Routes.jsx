import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import PrivateRoutes from "./PrivateRoutes"
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddPosts from "../pages/Dashboard/AddPosts/AddPosts";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import ViewComments from "../pages/Dashboard/ViewComments/ViewComments";

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
                loader: ({ params }) => fetch(`http://localhost:5000/posts/id/${params.id}`)
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "addPosts",
                element: <AddPosts></AddPosts>
            },
            {
                path: "myPosts",
                element: <MyPosts></MyPosts>
            },
            {
                path: "comments/:postId",
                element: <ViewComments></ViewComments>,
                loader: ({ params }) => fetch(`http://localhost:5000/comments/${params.postId}`)
            },
            
        ],
    },
])

