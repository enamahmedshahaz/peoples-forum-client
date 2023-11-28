import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserInfo = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userInfo, isPending: userInfoLoading } = useQuery({
        queryKey: [user?.email, 'userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    });
    return [userInfo, userInfoLoading];
};

export default useUserInfo;