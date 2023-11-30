import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://b812-peoples-forum-server.vercel.app/',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;