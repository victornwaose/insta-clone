import { useContext } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import LoggedInUserContext from "../../context/logged-in-user";
import useUser from "../../hooks/use-user";

export default function Sidebar() {
    const {
        user: { docId, fullName, username, userId, following },
    } = useUser();
    console.log(
        docId,
        fullName,
        username,
        userId,
        following,
        "docId,fullName, username, userId, following"
    );

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions
                userId={userId}
                following={following}
                loggedInUserDocId={docId}
            />
        </div>
    );
}
