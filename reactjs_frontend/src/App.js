import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";
import Home from "./components/Home/Home";
import UserProfile from './components/user/UserProfile';
import ContextProvider from './auth/ContextProvider';

import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import UserStocks from "./components/stocks/UserStocks";
import AddStock from './components/stocks/AddStock';
const App = () => {
    return (
        <ContextProvider>

            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/user_profile" exact component={UserProfile} />
                    <Route path="/user-stocks" exact component={UserStocks} />
                    <Route path="/add_stock" exact component={AddStock} />

                    {/*
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoutes path="/cart" exact component={Cart} />
                */}

                    {/* <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} /> */}
                </Switch>
            </BrowserRouter>

        </ContextProvider>

    );
}

export default App;
