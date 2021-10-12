import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/Firebase";
import * as ROUTES from "../constants/routes";
const Login = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const isInvalid = password === "" || emailAddress === "";

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setEmailAddress("");
            setPassword("");
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = "Login-instagram";
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
                    <form onSubmit={handleLogin} method="POST">
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
                            Log in
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm ">
                        Don't have an account?
                        <Link
                            to={ROUTES.SIGN_UP}
                            className="font-bold text-blue-600 "
                        >
                            {" "}
                            Sign up
                        </Link>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
