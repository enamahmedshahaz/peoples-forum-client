import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";


const Navbar = () => {

    const navLinks =
        <>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/">Membership</Link> </li>

            <div className="indicator">
                <IoIosNotificationsOutline className="text-3xl" />
                <span className="badge badge-md indicator-item text-red-600">8</span>
            </div>

            <li><Link to="/register">Join Us</Link> </li>
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
                <a className="btn btn-ghost text-xl">People&apos;s Forum</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>

                    <div className="dropdown-content">
                        <div className="menu menu-sm  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <p className="text-center">Welcome, <span className="font-semibold">Enam Ahmed</span> </p>
                            <ul className="mt-3">
                                <li> <Link to={"/dashboard"}>Dashboard</Link> </li>
                                <li> <button>Logout</button> </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        // <div className="navbar bg-base-100">
        //     <div className="flex-1">
        //         <a className="btn btn-ghost text-xl">daisyUI</a>
        //     </div>
        //     <div className="flex-none">
        //         <div className="dropdown dropdown-end">

        //             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">

        // <div className="indicator">
        //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        //     <span className="badge badge-sm indicator-item">8</span>
        // </div>

        //             </div>

        //             </div >
        // <div className="dropdown dropdown-end">
        //     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        //         <div className="w-10 rounded-full">
        //             <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        //         </div>
        //     </div>
        //     <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        //         <li><a>Settings</a></li>
        //         <li><a>Logout</a></li>
        //     </ul>
        // </div>
        //         </div >
        //     </div >
    );
};

export default Navbar;