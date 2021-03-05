import { combineReducers} from "redux";
import { reducer as trackerReducer } from "./tracker";

const reducers = combineReducers({
    tracker: trackerReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_REDUX') {
        state = undefined; // this will set the state to initial automatically
    }

    return reducers(state, action);
};

export default rootReducer;