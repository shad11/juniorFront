import * as actions from './actions';

export const logIn = ({ token, data }) => dispatch => {
    localStorage.setItem('token', token);

    dispatch(actions.setToken(token));
    dispatch(actions.setData(data));
    dispatch(actions.setIsAuth(true));
};

export const logOut = () => dispatch => {
    localStorage.removeItem('token');

    dispatch(actions.setToken(''));
    dispatch(actions.setIsAuth(false));
    dispatch(actions.setData({}));

    dispatch({type: 'RESET_REDUX'})
};