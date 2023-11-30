import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import SocialLogin from "../../components/SocialLogin";
import useAuth from "../../hooks/useAuth";


const Login = () => {

    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        //console.log('Login form data: ', data);

        signInUser(data.email, data.password)
            .then(result => {
                // console.log(result.user);
                // clear all input values in the form
                reset();

                //if comes from a private route navigate to that route, 
                // else navigate to home page after successful login
                navigate(from);

                // navigate(location?.state ?  location.state : '/');

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch(error => {

                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }

    return (

        <>
            <Helmet>
                <title>People&apos;s Forum | Login</title>
            </Helmet>

            <div className="hero min-h-screen bg-teal-100">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Secure your entry to meaningful discussions. Log in to Peoples Forum, your gateway to connect, share, and thrive. Dive into diverse topics, engage with a vibrant community, and contribute your perspective. Your voice shapes the dialogue. Welcome back to a platform that values every opinion.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">


                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} name="email" placeholder="Enter email" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <p className="text-red-600">Email is required</p>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <p className="text-red-600">Email is not in valid format</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input {...register("password", { required: true })} name="password" type="password" placeholder="Enter password" className="input input-bordered" autoComplete="on"/>

                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}

                            </div>

                            <div className="form-control">
                                <input  className="btn btn-primary mt-6" type="submit" value="Login" />
                            </div>
                        </form>

                        <div className="card-body text-center -mt-14">
                            <p>New here? Please  <Link className='font-bold text-blue-700' to="/register">Register</Link> </p>
                        </div>

                        <div className='mb-5 -mt-5'>
                            <div className='divider'>Or Login with</div>
                            <SocialLogin></SocialLogin>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;