import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";


const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('posts.json')
            .then(res => {
                setPosts(res.data);
            }).catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
                {posts.map((post) => <Post key={post._id} post={post}></Post>)}
            </div>
        </div>
    );
};

export default Posts;