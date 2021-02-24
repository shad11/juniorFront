import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import AppRoutes from "./routes";
import { userOperations } from "./store/user";
import { URL_AUTH } from "./constants/url";
import "materialize-css";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.post(`${URL_AUTH}/verify`, {token})
                .then( ({ data }) => {
                    if (data.success)
                        dispatch(userOperations.logIn({
                            token: data.dataNew.token,
                            data: data.dataNew.user
                        }));
                    else
                        dispatch(userOperations.logOut());
                })
                .catch(() => {
                    dispatch(userOperations.logOut());
                })
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="container">
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
