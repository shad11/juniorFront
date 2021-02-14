const isAuth = state => state.user.isAuth;
const getData = state => state.user.data;
const getToken = state => state.user.token;


export default {
    isAuth,
    getData,
    getToken,
};