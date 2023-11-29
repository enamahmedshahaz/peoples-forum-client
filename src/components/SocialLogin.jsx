import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";


const SocialLogin = () => {
    
    const { loginWithGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {

        loginWithGoogle()
            .then(result => {
                //save user data to database
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photo:  result.user?.photoURL,
                    badge: 'bronze'
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Login Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from);

                    }).catch(error => {
                        Swal.fire({
                            title: "Login Failed!",
                            text: `Error: ${error.message}`,
                            icon: "error"
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed!",
                    text: `Error: ${error.message}`,
                    icon: "error"
                });
            })
    };

    return (
        <div className='flex justify-center items-center'>
            <button className="btn btn-outline" onClick={handleGoogleLogin}>
                <FaGoogle></FaGoogle> Google
            </button>
        </div>
    );
};

export default SocialLogin;