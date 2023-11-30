import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {

    const { user, signOutUser } = useAuth();
    const [userInfo] = useUserInfo();

    const [isAdmin] = useAdmin();

    const handleLogout = () => {

        signOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign-out successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error while Sign-out!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    const navLinks =
        <>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/">Membership</Link> </li>

            <div className="indicator">
                <IoIosNotificationsOutline className="text-3xl" />
                <span className="badge badge-md indicator-item text-red-600">8</span>
            </div>

            {
                !user &&
                <li><Link to="/login">Join Us</Link> </li>
            }

        </>;

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a href="/" className="btn btn-ghost text-xl"> <FaPeopleGroup className="text-3xl"></FaPeopleGroup> People&apos;s Forum</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">

                {
                    user &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={userInfo?.photo} alt="User photo" referrerpolicy="no-referrer"/>
                            </div>
                        </div>

                        <div className="dropdown-content">
                            <div className="menu menu-sm  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <p className="text-center">Welcome, <span className="font-semibold">{userInfo?.name}</span> </p>
                                <ul className="mt-3">

                                    {isAdmin ?
                                        <>
                                            <li> <Link to={"/dashboard/adminProfile"}>Admin Dashboard</Link> </li>
                                        </> :
                                        <li> <Link to={"/dashboard/myProfile"}>Dashboard</Link> </li>
                                    }

                                    <li> <button onClick={handleLogout}>Logout</button> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;