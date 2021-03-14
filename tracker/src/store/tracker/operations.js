import * as actions from "./actions";

export const addTracker = tracker => (dispatch, getState) => {
    const { tracker: trackerStore } = getState();
    const { data } = trackerStore;

    const newTrackers = [tracker, ...data];

    dispatch(actions.saveTrackers(newTrackers));
};

export const changePeriod = (id, newPeriod) => (dispatch, getState) => {
    const { tracker: trackerStore } = getState();
    const { data } = trackerStore;

    const index = data.findIndex(elem => elem.id === id);
    data[index].period = newPeriod;

    dispatch(actions.saveTrackers(data));
}

export const changeIsActive = (id, active) => (dispatch, getState) => {
    const { tracker: trackerStore } = getState();
    const { data } = trackerStore;

    const index = data.findIndex(elem => elem.id === id);
    data[index].active = active;

    dispatch(actions.saveTrackers(data));
}

export const removeTracker = (id) => (dispatch, getState) => {
    const { tracker: trackerStore } = getState();
    const { data } = trackerStore;

    const dataNew = data.filter(elem => elem.id !== id);

    dispatch(actions.saveTrackers(dataNew));
}

export const saveToLS = () => (dispatch, getState) => {
    const { tracker: trackerStore } = getState();
    const { data } = trackerStore;

    localStorage.setItem('trackers', JSON.stringify(data));
    localStorage.setItem('trackerEndTime', Date.now());
}

export const getTrackers = () => (dispatch) => {
    const data = JSON.parse(localStorage.getItem('trackers')) || [];
    const endTime = localStorage.getItem('trackerEndTime');

    data.map(tracker => 
        tracker.active 
            ? tracker.period + Date.now() - endTime
            : tracker.period
    );

    dispatch(actions.saveTrackers(data));
}