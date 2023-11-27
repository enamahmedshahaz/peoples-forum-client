import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import { FaSortAmountUp } from "react-icons/fa";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts?sort=${sort}`)
            .then(res => {
                setPosts(res.data);
            }).catch(err => console.log(err));
    }, [sort])

    const handleSort = () => {
        setSort(1);
    }
    
    return (
        <div>
            <div className="flex justify-end mb-5">
                {
                    <button disabled={sort} onClick={handleSort} className="btn btn-outline ">  Sort by Popularity <FaSortAmountUp></FaSortAmountUp></button>
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
                {posts.map((post) => <Post key={post._id} post={post}></Post>)}
            </div>
        </div>
    );
};

export default Posts;