import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import UserContext from "./context/User";
import useAuthListener from "./hooks/use-auth-listener";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
    const { user } = useAuthListener();
    console.log(user);

    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <Suspense fallback={<p>Loading....</p>}>
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login}></Route>
                        <Route path={ROUTES.SIGN_UP} component={Signup}></Route>
                        <Route
                            path={ROUTES.DASHBOARD}
                            component={Dashboard}
                        ></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
