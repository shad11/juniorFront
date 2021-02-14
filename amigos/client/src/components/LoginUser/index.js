import React from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePagesTitle from "../HomePagesTitle";
import { userSelectors } from "../../store/user";
import styles from "./LoginUser.module.scss";

const LoginUser = () => {
    const isAuth = useSelector(userSelectors.isAuth);

    return (
        <div className={styles.userLogin}>
            {isAuth && <Redirect to={"/home/events"}/>}
            <HomePagesTitle title='Войти в систему'/>
        </div>

    );
};

export default LoginUser;