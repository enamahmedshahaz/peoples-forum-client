import { FaHouseChimney, FaPerson } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {

    return (
        <div className="flex">

            {/* dashboard side bar */}
            <div className="w-64 bg-teal-100 min-h-screen">
                <ul className="menu flex flex-col gap-2 uppercase">

                    {/* Menu links for general users */}
                    <li ><NavLink to="/dashboard/myProfile">
                        <FaPerson></FaPerson>My Profile </NavLink>
                    </li>

                    <li><NavLink to="/dashboard/addPosts">
                        <MdOutlinePostAdd></MdOutlinePostAdd> Add Posts </NavLink>
                    </li>

                    <li><NavLink to="/dashboard/myPosts">
                        <BsTextParagraph></BsTextParagraph>My Posts</NavLink>
                    </li>

                    <div className="divider"></div>

                    {/* Shared menu links for all*/}
                    <li><NavLink to="/">
                        <FaHouseChimney></FaHouseChimney>Home</NavLink>
                    </li>

                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;