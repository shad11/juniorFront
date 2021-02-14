export default class FilteringBuilder {
	constructor () {
		this.userFilter = {};
		this.eventFilter = {};
	}

	addFeedFilterEvent = (key, value) => {
		if (!value) {
			return this;
		}
		this.eventFilter = {
			...this.eventFilter,
			[key]: value,
		}
		return this;
	}
	
	addFeedFilterUser = (key, value) => {
		if (!value || Object.keys(value).filter(item => !item).length === 0) {
			return this;
		}
		this.userFilter = {
			...this.userFilter,
			[key]: value,
		}
		return this;
	}
}