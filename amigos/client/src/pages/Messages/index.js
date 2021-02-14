import React from 'react';
import HomePagesTitle from '../../components/HomePagesTitle';
import styles from "./Messages.module.scss";

const Messages = () => (
	<div className={styles.wrapper}>
		<HomePagesTitle title="Сообщения" />
	</div>
);

export default Messages;