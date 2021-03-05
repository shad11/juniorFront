import * as types from "./types";

const initialState = {
    data: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (types.SAVE_TRACKERS):
            return {...state, data: action.payload}
    }
    return state;
};