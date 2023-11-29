import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";


const MyProfile = () => {
    return (
        <div>
             <Helmet>
                <title>People&apos;s Forum | My Profile </title>
            </Helmet>

            <SectionTitle heading={'My Profile'} subHeading={'Your profile information'}></SectionTitle>

        </div>
    );
};

export default MyProfile;