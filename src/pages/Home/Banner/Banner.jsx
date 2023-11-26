

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
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