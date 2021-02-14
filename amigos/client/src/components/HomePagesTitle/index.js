import React from 'react';
import styles from "./HomePagesTitle.module.scss";

const HomePagesTitle = ({title, children}) => (
	<div className={styles.wrapper}>
		<div className={children ? styles.infoWrapper : styles.infoWrapperReversed}>
			{
				// children с расчетом на switch, который находится на странице с картой. Необходимо просто передать компонент switch'а.
				// в качестве примера смотреть страницу Profile
			}
			{children}
			<h1 className={styles.titleText}>{title}</h1>
		</div>
		<div className={styles.menuBlock}>
			<div className={styles.separator}/>
			<div className={styles.burger}>
				<i className="icon--burger"/>
			</div>
		</div>
	</div>
);

export default HomePagesTitle;