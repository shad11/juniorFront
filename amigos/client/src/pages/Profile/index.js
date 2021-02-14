import React from 'react';
import HomePagesTitle from '../../components/HomePagesTitle';
import styles from './Profile.module.scss';

const Profile = () => (
    <div className={styles.wrapper}>
        <HomePagesTitle title="Профиль"/>
    </div>
);

export default Profile;