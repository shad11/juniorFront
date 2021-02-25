import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { userOperations } from "./store/user";
import "materialize-css";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(userOperations.verify(token));
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
