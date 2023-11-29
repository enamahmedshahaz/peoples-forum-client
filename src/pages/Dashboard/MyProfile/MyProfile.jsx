import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useUserInfo from "../../../hooks/useUserInfo";
import badgeGold from '../../../assets/images/badge/gold.png'
import badgeBronze from '../../../assets/images/badge/bronze.png'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";


const MyProfile = () => {

    const [userInfo] = useUserInfo();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userLatestPosts, isPending: isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'userLatestPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/latest?email=${user?.email}&count=${3}`);
            return res.data;
        }
    });

    console.log(userLatestPosts);

    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | My Profile </title>
            </Helmet>

            <SectionTitle heading={'My Profile'} subHeading={'Your profile information'}></SectionTitle>

            <div className="flex gap-5 justify-between">

                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl border-dotted border-b-2 border-emerald-700">Welcome</h2>
                    <img className=" w-52 rounded-lg" src={userInfo?.photo} alt="photo of user" />
                    <h2 className="text-xl font-semibold uppercase">{userInfo?.name}</h2>
                    <p>({userInfo?.email})</p>
                    <p className="uppercase border-dotted font-semibold border-b-2 border-emerald-700">Badge:</p>
                    {
                        userInfo?.badge === 'gold' ?
                            <img className="w-20" src={badgeGold} alt="gold badge" />
                            : <img className=" w-28 rounded-lg" src={badgeBronze} alt="bronze badge" />

                    }
                </div>

                <div className="flex flex-col justify-start items-center gap-3">
                    <h2 className="text-2xl border-dotted border-b-2 border-emerald-700">Recent Posts</h2>

                    {
                        userLatestPosts?.map(post =>
                            <div key={post._id} className="p-4 bg-orange-100 rounded-md space-y-2">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <p>Posted on: { moment(post.latest).format('hh:mm a, DD MMM YYYY')}</p>
                                <p>{post.description}</p>
                            </div>)
                    }

                </div>
            </div>

        </div>
    );
};

export default MyProfile;