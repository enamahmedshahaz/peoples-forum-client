import Tag from "./Tag";
import { FaComment } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import { Link } from "react-router-dom";


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
        upVote,
        downVote
    } = post;

    return (

        <Link to={`post/${_id}`}>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure className="ml-3"><img className="rounded-xl" src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className="flex flex-wrap gap-2">
                        {
                            tags.map((tag, idx) => <Tag key={idx} tag={tag}></Tag>)
                        }
                    </div>
                    <div className="card-actions justify-start">
                        <div className="flex flex-row gap-5">
                            <div className="flex items-center justify-center gap-2 bg-teal-200 p-3 rounded-lg">
                                <FaComment className="text-2xl"></FaComment> 60
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-amber-300 p-3 rounded-lg">
                                <FaVoteYea className="text-2xl"></FaVoteYea> {upVote - downVote}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Post;