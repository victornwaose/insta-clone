/* eslint-disable no-nested-ternary */
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/logged-in-user";
import usePhotos from "../hooks/use-photo";
import Post from "./post";

export default function Timeline() {
    const user = useContext(LoggedInUserContext);
    const { photos } = usePhotos(user);
    console.log(photos);

    return (
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className="mb-5" />
            ) : (
                photos.length > 0 &&
                photos?.map((content) => (
                    <Post key={content.docId} content={content} />
                ))
            )}
        </div>
    );
}
