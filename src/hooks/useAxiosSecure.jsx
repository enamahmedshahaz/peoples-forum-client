import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://b812-peoples-forum-server.vercel.app/',
});

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    // request interceptor
    //Add authorization header for every secure API calls
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    // response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            //logout the user and send user to login page if receives 401 or 401 status
            signOutUser()
                .then(() => { }).catch(error => console.log(error));
            navigate("/login");
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;