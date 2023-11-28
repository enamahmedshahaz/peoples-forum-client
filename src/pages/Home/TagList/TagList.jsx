import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const TagList = () => {

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/tags')
            .then(res => {
                setTags(res.data);
                setLoading(false);
            }).catch(err => console.log(err));
    }, [axiosPublic])

    return (
        <div className="flex flex-wrap gap-2">
            {
                loading ?
                    <span className="loading loading-bars loading-lg"></span>
                    :
                    tags.map((tag, idx) =>
                        <div key={idx} className="badge badge-info gap-2 p-3">
                            <p className="text-white">{tag}</p>
                        </div>
                    )}
        </div>
    );
};

export default TagList;