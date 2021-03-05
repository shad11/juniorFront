import * as types from "./types";

export const saveTrackers = trackers => ({
    type: types.SAVE_TRACKERS,
    payload: trackers
});