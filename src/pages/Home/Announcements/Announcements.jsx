import useAnnouncements from "../../../hooks/useAnnouncements";


const Announcements = () => {

    const [announcements, isLoading, refetch] = useAnnouncements();

    return (
        <div className="flex flex-col gap-2">
            {
                isLoading ?
                    <span className="loading loading-bars loading-lg"></span>

                    : announcements?.map((announcement) =>
                        <div key={announcement._id} className="bg-yellow-100 rounded-lg p-5">
                            <div className="text-md font-semibold border-b-2 mb-2 text-gray-700">
                                {announcement.title}
                            </div>

                            <div className="text-xs text-gray-500">
                                {announcement.description}
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default Announcements;