import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useUserInfo from "../../../hooks/useUserInfo";
// import badgeGold from '../../../assets/images/badge/gold.png'
// import badgeBronze from '../../../assets/images/badge/bronze.png'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ImUsers } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { FaComment } from "react-icons/fa6";
import { useEffect, useState } from "react";
import PieChartComponent from "./PieChartComponent";


const AdminProfile = () => {

    const [userInfo] = useUserInfo();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({});

    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => setStats(res.data))
            .catch(err => console.log(console.log(err)))
    }, [axiosSecure]);

    const pieChartData = [
        { category: 'Users', value: stats.users },
        { category: 'Posts', value: stats.posts },
        { category: 'Comments', value: stats.comments },
    ];

    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | Admin Profile </title>
            </Helmet>

            <SectionTitle heading={'Admin Profile'} subHeading={'See admin info and site analytics'}></SectionTitle>

            <div className="flex gap-5 justify-between">

                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl border-dotted border-b-2 border-emerald-700">Welcome</h2>
                    <img className=" w-52 rounded-lg" src={userInfo?.photo} alt="photo of user" referrerpolicy="no-referrer" />
                    <h2 className="text-xl font-semibold uppercase">{userInfo?.name}</h2>
                    <p>({userInfo?.email})</p>
                    {/* <p className="uppercase border-dotted font-semibold border-b-2 border-emerald-700">Badge:</p>
                    {
                        userInfo?.badge === 'gold' ?
                            <img className="w-20" src={badgeGold} alt="gold badge" />
                            : <img className=" w-28 rounded-lg" src={badgeBronze} alt="bronze badge" referrerpolicy="no-referrer" />

                    } */}
                </div>

                <div className="flex flex-col  gap-3">
                    <h2 className="text-2xl text-center border-dotted border-b-2 border-emerald-700">Site Statistics</h2>

                    <div className="stats shadow-lg p-5 border border-teal-100 ">

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <ImUsers className="text-4xl"></ImUsers>
                            </div>
                            <div className="stat-title">Users</div>
                            <div className="stat-value">{stats.users}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <TfiWrite className="text-4xl"></TfiWrite>                            </div>
                            <div className="stat-title">Posts</div>
                            <div className="stat-value">{stats.posts}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaComment className="text-4xl"></FaComment>                            </div>
                            <div className="stat-title">Comments</div>
                            <div className="stat-value">{stats.comments}</div>
                        </div>
                    </div>

                    <div className="shadow-lg p-5 border border-teal-100 rounded-xl">
                        <PieChartComponent data={pieChartData} />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default AdminProfile;