import Request from "../services/request.js";
import {API, RESOURCES} from "../constants/api.js";
import Cookie from "../services/cookie.js";

export default class Authorization {
    static async login({email, password}) {
        const apiRequest = new Request(API);
        const requestBody = {
            email: email,
            password: password
        };

        try {
            const { token, message = '' } = await apiRequest.post(RESOURCES.login, requestBody);

            if (!token) return new Promise((resolve, reject) => reject(`Login error: ${message}`));

            Cookie.set('token', token, true);
            Cookie.set('email', email);

            return new Promise(resolve => resolve(token));
        } catch (error) {
            return new Promise((resolve, reject) => reject(`Login error: ${error}`));
        }
    }

    static async checkPassword(password) {
        const apiRequest = new Request(API);
        const loginData = {
            email: Authorization.email,
            password
        };

        try {
            const { token, message = '' } = await apiRequest.post(RESOURCES.login, loginData);

            if (!token)
                return new Promise((resolve, reject) => reject(`Login error: ${message}`));

            return new Promise(resolve => resolve(true));
        } catch(error) {
            return new Promise((resolve, reject) => reject(`Login error: ${error}`));
        }
    }

    static get token(){
        return this._getToken();
    }

    static get email() {
        return Cookie.get('email');
    }

    static isLogin() {
        return !!this._getToken();
    }

    static _getToken() {
        return Cookie.get('token', true);
    }
}