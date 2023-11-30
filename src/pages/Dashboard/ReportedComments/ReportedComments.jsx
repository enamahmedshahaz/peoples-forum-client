import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";


const ReportedComments = () => {

    const axiosSecure = useAxiosSecure();

    const { data: reports, isPending: isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reports');
            return res.data;
        }
    });

    const handleDelete = (report) => {

        Swal.fire({
            title: "Are you sure?",
            text: `Want to delete comment "${report.comment.slice(0, 20)}..."   `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Comment!"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/reports/${report._id}`)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Done!",
                                text: `Comment- "${report.comment.slice(0, 20)}..." deleted`,
                                icon: "success"
                            });
                            refetch(); //refetch data
                        }
                    })
                    .catch(error => {
                        //  console.log(error);
                        Swal.fire({
                            title: "Can't delete Comment!",
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
                <title>People&apos;s Forum | Reported Comments </title>
            </Helmet>

            <SectionTitle heading={'Reported Comments'} subHeading={'See reported comments and take action'}></SectionTitle>

            <div className="flex justify-evenly uppercase items-center">
                <p className="text-xl">Total feedback: {reports?.length}</p>
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
                                <th>Commenter Email</th>
                                <th>Reported Comment</th>
                                <th>Feedback reason</th>
                                <th>Delete This Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports?.map((report, index) => <tr key={report._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {report.commenterEmail}
                                </td>
                                <td> {report.comment}</td>
                                <td>
                                    <span className="uppercase font-semibold text-red-600"> {report.feedback}</span>
                                </td>

                                <th>
                                    <button onClick={() => handleDelete(report)} className="btn btn-ghost">
                                        <FaTrash className="text-red-500 text-xl"></FaTrash>
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

export default ReportedComments;