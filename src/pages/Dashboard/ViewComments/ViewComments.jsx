import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import { VscGithubAction } from "react-icons/vsc";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ViewComments = () => {

    const comments = useLoaderData();
    const [selectedReason, setSelectedReason] = useState('default');
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalContent, setModalContent] = useState('');

    const handleReadMore = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleReasonChange = (selected) => {
        setSelectedReason(selected);
    };

    const handleSubmitReport = (comment) => {

        const report = {
            commentId: comment._id,
            comment: comment.content,
            commenterName: comment.authorName,
            commenterEmail: comment.authorEmail,
            feedback: selectedReason,
            createdAt: new Date(),
        }

        axiosSecure.post('/reports', report)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Reported to Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`
                });
            })
    }

    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | Comments </title>
            </Helmet>

            <SectionTitle heading={'Comments '} subHeading={'People\'s reaction on your post'}></SectionTitle>

            <div className="flex justify-evenly uppercase items-center">
                <p className="text-xl">Total comments: {comments?.length}</p>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr className="uppercase">
                                <th>
                                    #
                                </th>
                                <th>Commenter</th>
                                <th>Comment</th>
                                <th>Feedback</th>
                                <th>Submit Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments?.map((comment, index) => <tr key={comment._id}>
                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={comment.authorImage} alt="user photo" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{comment.authorName}</div>
                                            <div className="text-sm opacity-50">{comment.authorEmail}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>{
                                    comment.content.length > 20 ?
                                        <>
                                            {comment.content.slice(0, 20)}{'...'}
                                            <a className="text-blue-700" onClick={() => handleReadMore(comment.content)}>
                                                Read more
                                            </a>
                                        </>
                                        :
                                        <>
                                            {comment.content}
                                        </>
                                }</td>

                                <th>
                                    <select
                                        onChange={(e) => handleReasonChange(e.target.value)} required
                                        defaultValue="default"
                                        className="select select-accent w-full">
                                        <option disabled value="default">Select a reason</option>
                                        <option value="spam">Spam</option>
                                        <option value="harassment">Harassment</option>
                                        <option value="violence">Violence</option>
                                    </select>
                                </th>

                                <th>
                                    <button onClick={() => handleSubmitReport(comment)} className="btn btn-error">
                                        <VscGithubAction className="text-lg text-white"></VscGithubAction>
                                    </button>
                                </th>

                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {
                    isModalOpen &&
                    <div className="modal-box">
                        <form method="dialog">
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Full comment</h3>
                        <p className="py-4">{modalContent}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default ViewComments;