import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";


const MyPosts = () => {
    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | My Posts </title>
            </Helmet>

            <SectionTitle heading={'My Posts'} subHeading={'See what you have posted'}></SectionTitle>

        </div>
    );
};

export default MyPosts;