import React from 'react';
import Header from "../../components/Header";
import styles from "./Page404.module.scss"
import HomePagesTitle from "../../components/HomePagesTitle";

const Page404 = () => (
    <div>
        <Header/>
        <div className={styles.page404}>
            <HomePagesTitle title='Страница не найдена'/>
        </div>

    </div>
);

export default Page404;