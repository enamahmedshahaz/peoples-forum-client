import Tag from "../../../components/Tag";
import { FaComment } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from 'moment';
import PropTypes from 'prop-types';

const Post = ({ post }) => {

    const { _id,
      //  authorImage,
        title,
        tags,
        upVote,
        downVote,
        latest
    } = post;

    const formattedTime = moment(latest).format('hh:mm a, DD MMM YYYY');

    return (

        <Link to={`post/${_id}`}>
            <div className="card card-side bg-base-100 shadow-xl hover:shadow-blue-500">
                <figure className="ml-3"><img className="rounded-xl" src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className="flex flex-wrap gap-2 max-h-min">
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
                                <MdHowToVote className="text-2xl"></MdHowToVote> {upVote - downVote}
                            </div>
                        </div>
                        <div className="bg-amber-100 rounded-lg p-2">
                            <p className="text-xs font-semibold text-gray-500"> Posted {formattedTime}</p>
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Post;

Post.propTypes = {
    post: PropTypes.object,
}