import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useUserInfo from "../../../hooks/useUserInfo";
import badgeGold from '../../../assets/images/badge/gold.png'
import badgeBronze from '../../../assets/images/badge/bronze.png'


const MyProfile = () => {

    const [userInfo] = useUserInfo();

    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | My Profile </title>
            </Helmet>

            <SectionTitle heading={'My Profile'} subHeading={'Your profile information'}></SectionTitle>

            <div className="flex gap-5 justify-between">

                <div className="flex flex-col justify-center items-center gap-3">
                    <h2 className="text-2xl border-dotted border-b-2 border-emerald-700">Welcome</h2>
                    <img className=" w-52 rounded-lg" src={userInfo?.photo} alt="photo of user" />
                    <h2 className="text-2xl font-semibold uppercase">{userInfo?.name}</h2>
                    <p>({userInfo?.email})</p>
                    <p className="uppercase border-dotted font-semibold border-b-2 border-emerald-700">Badge:</p>
                    {
                        userInfo?.badge === 'gold' ?
                            <img className="w-20" src={badgeGold} alt="gold badge" />
                            : <img className=" w-28 rounded-lg" src={badgeBronze} alt="bronze badge" />

                    }
                </div>

                <div>
                    <h2 className="text-2xl border-dotted border-b-2 border-emerald-700">Recent Posts</h2>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;