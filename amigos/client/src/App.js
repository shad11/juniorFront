import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import { langSelectors } from "./store/lang";
import { mapOperations } from "./store/map";
import { categoriesOperations } from "./store/categories";
import { userOperations } from "./store/user";
import { LIBRARIES } from "./constants/map";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";

const App = () => {
    const dispatch = useDispatch();
    const lang = useSelector(langSelectors.getLangAbbr);

    const { isLoaded: mapIsLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries: LIBRARIES,
        language: 'ru'
    });

    useEffect(() => {
        axios.post('/api/auth/login',
            {
                email: process.env.REACT_APP_TEST_EMAIL,
                password: process.env.REACT_APP_TEST_PASSWORD
            })
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('token', token);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.post('/api/auth/verify', {token})
                .then( ({ data }) => {
                    if (data.success)
                        dispatch(userOperations.rewriteToken(data.token));
                    else
                        dispatch(userOperations.removeToken());
                })
                .catch(err => {
                    dispatch(userOperations.removeToken());
                })
        }

        dispatch(categoriesOperations.getCategories());
     }, []);

    useEffect(() => {
        if (mapIsLoaded) {
            dispatch(mapOperations.setLocation(lang));
        }
    }, [mapIsLoaded]);

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
