import bannerImg from "../../../assets/images/banner/banner.jpg"


const Banner = () => {

    return (
        <div className="hero h-[600px] bg-fixed" style={{ backgroundImage: `url(${bannerImg})` }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-5xl font-bold">Connect, Discuss, Thrive: Welcome to Peoples Forum!</h1>
                    <p className="mb-5">Your platform for rich conversations. Engage in diverse discussions, share perspectives, and connect with a vibrant community. Join us to explore trending topics and amplify your voice in a space that values every opinion. Start conversing and shaping the dialogue at Peoples Forum today!</p>
                    <form>
                        <div className="form-control mb-5">
                            <input type="text" placeholder="Search tags..." className="input input-bordered" required />
                        </div>
                        <button className="btn btn-primary">Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;