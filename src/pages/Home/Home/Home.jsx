import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Posts from "../Posts/Posts";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | Home</title>
            </Helmet>
            <Banner></Banner>
            <div className="flex mt-5 mb-5 gap-3">
                <div className="bg-slate-200 w-1/4 flex flex-col gap-5 p-2 rounded-md">
                    <div className="bg-orange-300 rounded-md p-5">
                        tags
                    </div>
                    <div className="bg-purple-200 rounded-md p-5">
                        announcement
                    </div>
                </div>
                <div className="bg-red-200 w-3/4 p-5 rounded-md">
                    <Posts></Posts>
                </div>
            </div>

        </div>
    );
};

export default Home;