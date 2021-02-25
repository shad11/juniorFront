import * as actions from './actions';
import { authApi } from '../../services';
import {userOperations} from "./index";

const _logUser = (token, data) => dispatch => {
    localStorage.setItem('token', token);

    dispatch(actions.setToken(token));
    dispatch(actions.setData(data));
    dispatch(actions.setIsAuth(true));
}

export const register = ({ login, email, password}) => async (dispatch) => {
    try {
        const { token, user: data } = await authApi.register(login, email, password);

        dispatch(_logUser(token, data));
        dispatch(actions.setError(null));
    } catch ({ response }) {
        dispatch(actions.setError({ message: response.data.message}));
    }
}

export const logIn = ({ email, password }) => async (dispatch) => {
    try {
        const { token, user: data } = await authApi.logIn(email, password);

        dispatch(_logUser(token, data));
        dispatch(actions.setError(null));
    } catch ({ response }) {
        dispatch(actions.setError({ message: response.data.message}));
    }
};

export const verify = (token) => async (dispatch) => {
    try {
        const { dataNew, success } = await authApi.verify(token);

        if (success) {
            dispatch(_logUser(dataNew.token, dataNew.user));
        }
        else
            dispatch(logOut());
    } catch (error) {
        dispatch(userOperations.logOut());
    }
}

export const logOut = () => dispatch => {
    localStorage.removeItem('token');

    dispatch(actions.setToken(''));
    dispatch(actions.setIsAuth(false));
    dispatch(actions.setData({}));

    dispatch({type: 'RESET_REDUX'})
};