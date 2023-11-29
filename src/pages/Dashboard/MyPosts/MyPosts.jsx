import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaComment, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyPosts = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userPosts, isPending: isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'userPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/email/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (post) => {
        //console.log('Delete: ', id);
        Swal.fire({
            title: "Are you sure?",
            text: `Want to delete post - ${post.title} `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                axiosSecure.delete(`/posts/${post._id}`)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `Post: ${post.title} has been deleted!`,
                                icon: "success"
                            });
                            refetch(); //refetch posts data
                        }
                    })
                    .catch(error => {
                        //  console.log(error);
                        Swal.fire({
                            title: "Can't Delete!",
                            text: `Error occurred: ${error.message}`,
                            icon: "error"
                        });
                    });
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>People&apos;s Forum | My Posts </title>
            </Helmet>

            <SectionTitle heading={'My Posts'} subHeading={'See what you have posted'}></SectionTitle>

            <div className="flex justify-evenly uppercase items-center">
                <p className="text-xl">Total posts: {userPosts?.length}</p>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="uppercase">
                                <th>
                                    #
                                </th>
                                <th>Post Title</th>
                                <th>Votes</th>
                                <th>Comment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPosts?.map((post, index) => <tr key={post._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {post.title}
                                </td>
                                <td>{post.voteDifference}</td>

                                <th>
                                    <Link to={`/dashboard/comments/${post._id}`}>
                                        <button className="btn btn-warning">
                                            <FaComment></FaComment>
                                        </button>
                                    </Link>
                                </th>

                                <th>
                                    <button onClick={() => handleDelete(post)} className="btn btn-error">
                                        <FaTrashCan></FaTrashCan>
                                    </button>
                                </th>
                            </tr>)}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyPosts;