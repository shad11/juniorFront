import React from 'react';
import CreateEventForm from "../../components/CreateEvent";
import HomePagesTitle from '../../components/HomePagesTitle';

const CreateEvent = () => (
	<>
		<HomePagesTitle title="Создать событие" />
		<CreateEventForm />
	</>
);

export default CreateEvent;