import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MdAdminPanelSettings } from "react-icons/md";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users, isPending: isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Want to make ${user.name} Admin?  `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Done!",
                                text: `User: ${user.name} is now Admin!`,
                                icon: "success"
                            });
                            refetch(); //refetch data
                        }
                    })
                    .catch(error => {
                        //  console.log(error);
                        Swal.fire({
                            title: "Can't make Admin!",
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
                <title>People&apos;s Forum | Manage Users </title>
            </Helmet>

            <SectionTitle heading={'Manage Users'} subHeading={'See users and manage them'}></SectionTitle>

            <div className="flex justify-evenly uppercase items-center">
                <p className="text-xl">Total Users: {users?.length}</p>
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
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Subscription Status</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => <tr key={user._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td> {user.email}</td>

                                <td>
                                    {
                                        user.badge === 'gold' ?
                                            <span className="uppercase font-bold text-[#FFDF00]">{user.badge}</span> :
                                            <span className="uppercase font-bold text-[#CD7F32]">{user.badge}</span>
                                    }</td>

                                <th>
                                    {
                                        user.role === 'admin' ?
                                            'Admin'
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost">
                                                <MdAdminPanelSettings className="text-red-500 text-3xl"></MdAdminPanelSettings>
                                            </button>
                                    }
                                </th>
                            </tr>)}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;