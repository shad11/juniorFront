import * as actions from "./actions";
import { employeeApi } from "../../services";

const _setError = (msg) => dispatch => {
    dispatch(actions.setSuccess(null))
    dispatch(actions.setError({ message: msg}));
};

const _setData = (data) => dispatch => {
    dispatch(actions.savingStaff(data));
    dispatch(actions.setError(null));
}

export const loadStaff = () => async dispatch => {
    dispatch(actions.staffLoading(true));

    try {
        const data = await employeeApi.getAll();

        dispatch(actions.savingStaff(data));
        dispatch(actions.staffLoading(false));
    } catch(error) {
        dispatch(actions.staffLoading(false));
    }
};

export const addEmployee = (values) => async (dispatch, getState) => {
    const { user, staff } = getState();
    const { token } = user;
    const { data } = staff;

    try {
        const employee = await employeeApi.create(values, token);

        dispatch(_setData([employee, ...data]));
        dispatch(actions.setSuccess({ message: `Employee ${employee.fullName} was added!`}));
    } catch ({ response }) {
        dispatch(_setError(response.data.message));
    }
}

export const editEmployee = (values) => async (dispatch, getState) => {
    const { user, staff } = getState();
    const { token } = user;
    const { data } = staff;

    try {
        const employee = await employeeApi.edit(values, token);

        const index = data.findIndex(elem => elem._id === employee._id);
        data[index] = employee;

        dispatch(actions.selectEmployee(employee));
        dispatch(_setData(data));
        dispatch(actions.setSuccess({ message: `Employee ${employee.fullName} has been edit!`}));
    } catch ({ response }) {
        dispatch(_setError(response.data.message));
    }
}

export const removeEmployee = ({ id, fullName }) => async (dispatch, getState) => {
    const { user, staff } = getState();
    const { token } = user;
    const { data } = staff;

    try {
        await employeeApi.delete(id, token);

        const dataNew = data.filter(elem => elem._id !== id);

        dispatch(_setData(dataNew));
    } catch ({ response }) {
        dispatch(_setError(response.data.message));
    }
};