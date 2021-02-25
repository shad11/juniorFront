import * as actions from './actions';
import { authApi } from '../../services';

const _logUser = (token, data) => dispatch => {
    localStorage.setItem('token', token);

    dispatch(actions.setToken(token));
    dispatch(actions.setData(data));
    dispatch(actions.setIsAuth(true));
}

export const register = ({ login, email, password}) => async (dispatch) => {
    const { token, user: data } = await authApi.register(login, email, password);

    dispatch(_logUser(token, data));
}

export const logIn = ({ email, password }) => async (dispatch) => {
    const { token, user: data } = await authApi.logIn(email, password);

    dispatch(_logUser(token, data));
};

export const verify = (token) => async (dispatch) => {
    const { dataNew, success } = await authApi.verify(token);

    if (success) {
        dispatch(_logUser(dataNew.token, dataNew.user));
    }
    else
        dispatch(logOut());
}

export const logOut = () => dispatch => {
    localStorage.removeItem('token');

    dispatch(actions.setToken(''));
    dispatch(actions.setIsAuth(false));
    dispatch(actions.setData({}));

    dispatch({type: 'RESET_REDUX'})
};