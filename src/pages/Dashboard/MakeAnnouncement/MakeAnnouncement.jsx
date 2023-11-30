import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useUserInfo from '../../../hooks/useUserInfo'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { HiOutlineSpeakerphone } from "react-icons/hi";


const MakeAnnouncement = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [userInfo] = useUserInfo();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {

        //console.log('Form Data: ', data);

        const announcementInfo = {
            authorName: userInfo?.name,
            authorEmail: userInfo?.email,
            authorImage: userInfo?.photo,
            title: data.title,
            description: data.description,
            createdAt: new Date(),
        }
        // console.log('announcementInfo: ', announcementInfo);

        const response = await axiosSecure.post('/announcements', announcementInfo);

        if (response.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} - Announcement is added.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>

            <Helmet>
                <title>People&apos;s Forum | Make Announcement </title>
            </Helmet>

            <SectionTitle heading={'Make a Announcement'} subHeading={'Give instructions, announcements and  important updates to all users'}></SectionTitle>


            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Author Image */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Author Image</span>
                        </label>
                        <img className="w-52 rounded-md mb-5" src={userInfo?.photo} />
                    </div>

                    {/* Author Name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Author Name</span>
                        </label>
                        <input disabled
                            type="text"
                            defaultValue={userInfo?.name}
                            className="input input-bordered w-full" />
                    </div>


                    {/* Announcement Title */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Announcement Title *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title of your announcement"
                            {...register('title', { required: true })}
                            className="input input-bordered w-full" />
                        {errors.title?.type === "required" && (
                            <p className="text-red-600">Announcement Title is required</p>
                        )}
                    </div>

                    {/* Announcement description */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Announcement Description *</span>
                        </label>
                        <textarea
                            {...register('description', { required: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Description of your announcement">
                        </textarea>
                        {errors.description?.type === "required" && (
                            <p className="text-red-600">Announcement Description  is required</p>
                        )}
                    </div>

                    <button className="btn btn-primary">
                        Make Announcement <HiOutlineSpeakerphone className="text-2xl"></HiOutlineSpeakerphone>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;