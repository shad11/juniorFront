import { combineReducers } from "redux";
import { reducer as userReducer } from "./user";
import { reducer as staffReducer } from "./staff";

const reducers = combineReducers({
    user: userReducer,
    staff: staffReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_REDUX') {
        state = undefined; // this will set the state to initial automatically
    }

    return reducers(state, action);
};

export default rootReducer;