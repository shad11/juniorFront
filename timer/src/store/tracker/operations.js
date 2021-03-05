import * as actions from "./actions";

export const addTracker = tracker => (dispatch, getState) => {
    const { tracker: trackerStore } = getState();
    const { data } = trackerStore;

    const newTrackers = [tracker, ...data];

    dispatch(actions.saveTrackers(newTrackers));
};