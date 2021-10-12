import { useState, useEffect, useContext } from "react";
import UserContext from "../context/User";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
    const [activeUser, setActiveUser] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(() => {
        async function getUserObjectByUserId() {
            const response = await getUserByUserId(user.uid);

            setActiveUser(response[0]);
        }
        if (user?.uid) {
            getUserObjectByUserId();
        }
    }, [user]);
    return { user: activeUser };
}
