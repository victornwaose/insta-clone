import { useState, useEffect, useContext } from "react";
import UserContext from "../context/User";
import { getPhotos, getUserByUserId } from "../services/firebase";

export default function usePhotos(user) {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = "" },
    } = useContext(UserContext);
    console.log(photos, "photos");

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(userId);
            // does the user actually follow people?

            if (following?.length > 0) {
                const followedUserPhotos = await getPhotos(userId, following);
                // re-arrange array to be newest photos first by dateCreated
                followedUserPhotos.sort(
                    (a, b) => b.dateCreated - a.dateCreated
                );
                setPhotos(followedUserPhotos);
            }
        }

        getTimelinePhotos();
    }, [userId]);

    return { photos };
}
