import actions from './actions';
import axios from "axios";

const addEvent = event => (dispatch, getState) => {
    const { user } = getState();
    const { dataUser } = user;
    const { events } = dataUser;

    const newArr = [...events, event];

    dispatch(actions.setEvents(newArr));
};

const rewriteToken = token => dispatch => {
    localStorage.setItem('token', token);

    dispatch(actions.setToken(token));
    dispatch(actions.setIsAuth(true));

    axios.get('/api/users/', {
        headers: { "Authorization": token }
    })
        .then( ({ data }) => {
            dispatch(actions.setData(data.data));
        })
};

const removeToken = () => dispatch => {
    localStorage.removeItem('token');

    dispatch(actions.setToken(''));
    dispatch(actions.setIsAuth(false));
    dispatch(actions.setData({}));
};

export default {
    addEvent,
    rewriteToken,
    removeToken,
}

