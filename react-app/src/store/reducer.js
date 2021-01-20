import { reducer as reducerModal } from "./modal/reducer";
import { reducer as reducerProducts } from "./products/reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    products: reducerProducts,
    modal: reducerModal
});