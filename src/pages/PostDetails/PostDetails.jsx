
import { useLoaderData } from 'react-router-dom';
import SectionTitle from "../../components/SectionTitle"
import { FaEnvelope } from 'react-icons/fa';
import { FaTags } from "react-icons/fa";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";


import Tag from '../../components/Tag';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
const PostDetails = () => {

    const loadedPost = useLoaderData();
    const { _id, authorName, authorEmail, authorImage, title, description, tags, upVote, downVote } = loadedPost;

    const [upVoteCount, setUpVoteCount] = useState(upVote);
    const [downVoteCount, setDownVoteCount] = useState(downVote);

    const commentInput = useRef();
    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const shareUrl = `https://b8a12-peoples-forum.web.app/post/${_id}`;
    const [userInfo] = useUserInfo();


    const handleDownVote = (id) => {

        if (user) {
            axiosSecure.patch(`/posts/incrementDownVote/${id}`)
                .then(res => {
                    setDownVoteCount(res.data.updatedDownVote);
                }).catch(error => {
                    console.log(error);
                })
        } else {
            Swal.fire("Please login first");
        }

    }

    const handleUpVote = (id) => {
        if (user) {
            axiosSecure.patch(`/posts/incrementUpVote/${id}`)
                .then(res => {
                    setUpVoteCount(res.data.updatedUpVote);
                }).catch(error => {
                    console.log(error);
                })
        } else {
            Swal.fire("Please login first");
        }

    }

    const handleAddComment = (id) => {

        if (user) {
            if (commentInput.current.value.length > 0) {
                const newComment = {
                    postId: id,
                    authorName: userInfo?.name,
                    authorEmail: userInfo?.email,
                    authorImage: userInfo?.photo,
                    content: commentInput.current.value,
                    createdAt: new Date()
                }

                axiosSecure.post(`/comments`, newComment)
                    .then(res => {
                        console.log(res.data.insertedId)
                        if (res.data.insertedId) {
                            commentInput.current.value = '';
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your comment is added!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                Swal.fire("Comment can't be empty");
            }
        } else {
            Swal.fire("Please login first");
        }


    }

    return (
        <div className='flex min-h-screen gap-4 my-5'>
            <div className='bg-yellow-100 w-1/4 flex flex-col items-center p-2 rounded-lg space-y-5'>
                <SectionTitle heading={'Author'} subHeading={'who posted'}></SectionTitle>

                <img className='rounded-md w-28' src={authorImage} alt="User Photo" referrerpolicy="no-referrer" />
                <div className='text-center'>
                    <h4 className='text-xl'> {authorName}</h4>
                    <h4 className='text-base'> <FaEnvelope className='inline-block'></FaEnvelope> {authorEmail}</h4>
                </div>

            </div>

            <div className='bg-green-100 flex-1 p-10 pt-2 rounded-lg space-y-5'>

                <SectionTitle heading={'Post details'} subHeading={'More info about post'}></SectionTitle>

                <h3 className='text-2xl'>{title}</h3>

                <p className='space-y-3'>{description}</p>

                <div className="flex flex-wrap gap-2 h-12">
                    <FaTags className='text-2xl'></FaTags>
                    {
                        tags?.map((tag, idx) => <Tag key={idx} tag={tag}></Tag>)
                    }
                </div>

                <div className='flex justify-between my-5'>

                    <div>
                        <button onClick={() => handleDownVote(_id)} className='btn btn-sm btn-warning text-white'> <BiSolidDownvote className='text-2xl inline-block'></BiSolidDownvote> Downvote {downVoteCount}</button>
                        <button onClick={() => handleUpVote(_id)} className='ml-5 btn btn-sm btn-success text-white'> <BiSolidUpvote className='text-2xl inline-block'></BiSolidUpvote> Upvote {upVoteCount}</button>
                    </div>

                    <div className='space-x-2'>

                        <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <WhatsappShareButton url={shareUrl} >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </div>


                <div className='space-y-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Add comment on this post</span>

                        </label>
                        <textarea ref={commentInput} className="textarea textarea-bordered h-36" placeholder="Enter comment text here"></textarea>
                    </div>

                    <div onClick={() => handleAddComment(_id)}>
                        <button className='btn btn-sm btn-secondary'>Add comment</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostDetails;