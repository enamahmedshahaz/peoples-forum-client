import useTags from "../../../hooks/useTags";
const TagList = () => {

    const [tags, isLoading,] = useTags();

    return (
        <div className="flex flex-wrap gap-2">
            {
                isLoading ?
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