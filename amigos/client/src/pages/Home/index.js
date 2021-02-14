import React from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import styles from "./Home.module.scss";
import HomeRoutes from '../../routes/HomeRoutes';
import "../../scss/base/base.scss";
import Header from "../../components/Header";

const Home = () => {
	const location = useLocation();
	const rootLocation = !location
		|| location.pathname === '/'
		|| location.pathname === '/home'
		|| location.pathname === '/home/';

	return (
		<div className={styles.bg}>
			<Header/>
			{rootLocation  &&  <Redirect to='/home/events'/>}
			<div className="container">
				<div className={styles.homeLayout}>
					<div className={styles.mainMenu}>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/profile">
							<i className={`icon--profile-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Профиль</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/events">
							<i className={`icon--event-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Все события</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/responses">
							<i className={`icon--bell-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Отклики</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/messages">
							<i className={`icon--message-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Сообщения</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/create-event">
							<div className={styles.mainMenu__addEventIconBg}>
								<i className={`icon--add-circle`}/>
							</div>
							<span className={styles.mainMenu__info}>Создать событие</span>
						</NavLink>
					</div>
					<div className={styles.pageRoutes}>
						<HomeRoutes/>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Home;