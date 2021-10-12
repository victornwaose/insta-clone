import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/Firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const Signup = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const isInvalid = password === "" || emailAddress === "";

    const handleSignup = async (event) => {
        event.preventDefault();
        const usernameExist = await doesUsernameExist(userName);
        if (!usernameExist.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);
                await createdUserResult.user.updateProfile({
                    displayName: userName,
                });

                await firebase.firestore().collection("user").add({
                    userId: createdUserResult.user.uid,
                    userName: userName.toLowerCase(),
                    name,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now(),
                });
                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setName("");
                setEmailAddress("");
                setPassword("");
                setError(error.message);
            }
        } else {
            setError("UserName taken please enter another one");
        }
    };

    useEffect(() => {
        document.title = "Sign-Up Page";
    }, []);
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img
                    src="/images/iphone-with-profile.jpg"
                    alt="iphone-with-instagram"
                />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col bg-white p-4 border border-gray-primary mb-4">
                    <h1 className="flex justify-center  w-full">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="mt-2 w-6/12"
                        />
                    </h1>
                    {error && (
                        <p className="mb-4 text-xs text-red-500"> {error}</p>
                    )}
                    <form onSubmit={handleSignup} method="POST">
                        <input
                            aria-label="Enter your Name"
                            type="text"
                            placeholder="Name"
                            className="text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
                            onChange={({ target }) => setName(target.value)}
                            value={name}
                        />
                        <input
                            aria-label="Enter your UserName"
                            type="text"
                            placeholder="UserName"
                            className="text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUserName(target.value)}
                            value={userName}
                        />
                        <input
                            aria-label="Enter your Email"
                            type="text"
                            placeholder="EmailAddress"
                            className="text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
                            onChange={({ target }) =>
                                setEmailAddress(target.value)
                            }
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter your Password"
                            type="password"
                            placeholder="Password"
                            className="text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-500 text-white font-bold w-full rounded h-8 items-center" ${
                                isInvalid && "opacity-50"
                            }`}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm ">
                        ALready have an account?
                        <Link
                            to={ROUTES.LOGIN}
                            className="font-bold text-blue-600 "
                        >
                            {" "}
                            Login
                        </Link>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
