import { combineReducers} from "redux";
import { reducer as trackerReducer } from "./tracker";

const rootReducer = combineReducers({
    tracker: trackerReducer
});

export default rootReducer;