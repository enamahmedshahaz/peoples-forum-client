import Tag from "./Tag";
import { FaComment } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";


const Post = ({ post }) => {

    const { _id,
        authorName,
        authorEmail,
        authorImage,
        title,
        description,
        tags,
        createdAt,
        updatedAt,
        upvote,
        downvote,
        voteDifference
    } = post;

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>

                <div className="">
                    <div className="flex items-center justify-center gap-2 bg-teal-200 p-2 rounded-lg">
                        <FaComment></FaComment> 60
                    </div>

                    <div className="flex items-center justify-center gap-2 bg-amber-300 p-2 rounded-xl">
                        <FaVoteYea></FaVoteYea> {voteDifference}
                    </div>
                </div>

                {
                    tags.map((tag, idx) => <Tag key={idx} tag={tag}></Tag>)
                }
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    );
};

export default Post;