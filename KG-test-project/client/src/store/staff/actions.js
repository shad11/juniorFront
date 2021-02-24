import * as types from "./types";

export const staffLoading = isLoading => ({
    type: types.SET_IS_LOADING,
    payload: isLoading
});

export const savingStaff = data => ({
    type: types.SAVE_DATA,
    payload: data
});

export const selectEmployee = data => ({
    type: types.SELECT_EMPLOYEE,
    payload: data
});