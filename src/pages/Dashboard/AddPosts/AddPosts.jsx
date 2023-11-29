import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useUserInfo from '../../../hooks/useUserInfo'
import useTags from "../../../hooks/useTags";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";

const AddPosts = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [userInfo] = useUserInfo();

    const [tags, ,] = useTags();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {

        //console.log('Add Post Form Data: ', data);

        const postInfo = {
            authorName: userInfo?.name,
            authorEmail: userInfo?.email,
            authorImage: userInfo?.photo,
            title: data.title,
            description: data.description,
            tags: data.tags,
            createdAt: new Date(),
            upVote: parseInt(0),
            downVote: parseInt(0),
        }
        // console.log('postInfo: ', postInfo);

        const response = await axiosSecure.post('/posts', postInfo);
        if (response.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} - Post added.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>

            <Helmet>
                <title>People&apos;s Forum | Add Posts </title>
            </Helmet>

            <SectionTitle heading={'Add a New post'} subHeading={'Post your thoughts and ideas'}></SectionTitle>


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

                    {/* Author Email */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Author Email</span>
                        </label>
                        <input disabled
                            type="email"
                            defaultValue={userInfo?.email}
                            className="input input-bordered w-full" />
                    </div>

                    {/* Post Title */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Post Title *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title of your post"
                            {...register('title', { required: true })}
                            className="input input-bordered w-full" />
                        {errors.title?.type === "required" && (
                            <p className="text-red-600">Post Title is required</p>
                        )}
                    </div>

                    {/* Post description */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Post Description *</span>
                        </label>
                        <textarea {...register('description', { required: true })} className="textarea textarea-bordered h-24" placeholder="Description of your post"></textarea>
                        {errors.description?.type === "required" && (
                            <p className="text-red-600">Post Description  is required</p>
                        )}
                    </div>

                    {/* Tag Options */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Select Tags *</span>
                        </label>

                        <select multiple defaultValue={[]} {...register('tags', { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value="default">Select related tags</option>
                            {
                                tags?.map((aTag, idx) => <option key={idx} value={aTag}>{aTag}</option>)
                            }
                        </select>

                        {errors.tags?.type === "required" && (
                            <p className="text-red-600">Tag is required</p>
                        )}
                    </div>

                    <div className="flex gap-6 my-6">
                        {/* Down Vote */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Down Vote</span>
                            </label>
                            <input disabled
                                type="text"
                                defaultValue={0}
                                className="input input-bordered w-full" />
                        </div>

                        {/* Up Vote */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Up Vote</span>
                            </label>
                            <input disabled
                                type="text"
                                defaultValue={0}
                                className="input input-bordered w-full" />
                        </div>
                    </div>

                    <button className="btn btn-primary">
                        Add Post <FaPlus></FaPlus>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddPosts;