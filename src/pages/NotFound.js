import React, { useEffect } from "react";

const NotFound = () => {
    useEffect(() => {
        document.title = "Not Found";
    }, []);
    return (
        <div className="bg-gray-300">
            <div className="mx-auto max-w-screen-lg">
                <p className="text-center text-2xl">Page Not Found</p>
            </div>
        </div>
    );
};

export default NotFound;
