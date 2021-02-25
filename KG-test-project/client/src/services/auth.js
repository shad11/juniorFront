import api from "./api";
import { REGISTER, LOGIN, AUTH_VERIFY } from "../constants/endpoints";

export default {
    async register(login, email, password) {
        const { data }  = await api.post(REGISTER, { login, email, password });
        return data;
    },

    async logIn(email, password) {
        const { data } = await api.post(LOGIN, { email, password });
        return data;
    },

    async verify(token) {
        const { data }  = await api.post(AUTH_VERIFY, { token });
        return data;
    }
}