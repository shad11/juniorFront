import React from 'react';
import styles from './Header.module.scss';
import "../../scss/base/base.scss"
import {Link, NavLink} from "react-router-dom";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelectors} from "../../store/user";

const Header = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(userSelectors.isAuth);

    const logOut = () => {
        dispatch(userActions.setIsAuth(false));
        dispatch(userActions.setData({}));
        dispatch(userActions.setToken(''));

        localStorage.removeItem('token');
    };

    return (
        <header className={`${styles.header}`}>
            <div className="container">
                <div className={styles.header__content}>
                    <Link className={styles.logo__link} to="/home/events">
                        <img src="/assets/logo.png" alt="logo"/>
                    </Link>

                    <div className={styles.header__pannel}>
                        <ul className={styles.header__nav}>
                            <li>
                                <NavLink activeClassName={styles.navlink__selected} className={styles.navlink}
                                         to="/about">
                                    О нас</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={styles.navlink__selected} className={styles.navlink}
                                         to="/questions">
                                    Вопросы и ответы</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={styles.navlink__selected} className={styles.navlink}
                                         to="/contacts">
                                    Контакты</NavLink>
                            </li>
                        </ul>

                        {isAuth && <div className={styles.btn__wrapper}>
                            <Button classList='btn btn--stroke-orange btn--header btn--header-mobile' action={logOut}>
                                <span className={styles.header__icon}>
                                    <i className={`icon--logout`}/>
                                </span>
                                Выйти
                            </Button>
                        </div>}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;