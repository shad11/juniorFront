import axios from "axios";
import * as actions from './actions';
import { URL_STAFF } from "../../constants/url";

export const loadStaff = () => dispatch => {
    dispatch(actions.staffLoading(true));

    axios.get(URL_STAFF)
        .then(({ data }) => {
            dispatch(actions.savingStaff(data));
            dispatch(actions.staffLoading(false));
        })
        .catch(error => dispatch(actions.staffLoading(false)));
};

export const addEmployee = (employee) => (dispatch, getState) => {
    const { staff } = getState();
    const { data } = staff;

    dispatch(actions.savingStaff([employee, ...data]));
};

export const editEmployee = (employee) => (dispatch, getState) => {
    const { staff } = getState();
    const { data } = staff;

    const index = data.findIndex(elem => elem._id === employee._id);
    data[index] = employee;

    dispatch(actions.selectEmployee(employee));
    dispatch(actions.savingStaff(data));
};

export const removeEmployee = (employeeId) => (dispatch, getState) => {
    const { staff } = getState();
    const { data } = staff;

    const dataNew = data.filter(elem => elem._id !== employeeId);

    dispatch(actions.savingStaff(dataNew));
};