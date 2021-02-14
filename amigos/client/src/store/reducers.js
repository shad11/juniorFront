import { combineReducers } from "redux";
import { reducer as mapReducer} from "./map";
import { reducer as langReducer } from "./lang";
import { reducer as categoriesReducer} from "./categories";
import { reducer as userReducer} from "./user";

export const rootReducer = combineReducers({
    map: mapReducer,
    lang: langReducer,
    categories: categoriesReducer,
    user: userReducer
});
