import { path, maxAge} from "../constants/cookie.js";

export default class Cookie {
    static set(name, value, encode = false) {
        const valueEn = encode ? this._encodeStr(value) : value;

        document.cookie = `${encodeURIComponent(name)}=${valueEn};path=${path};max-age=${maxAge}`;
    }

    static delete(name) {
        document.cookie = `${encodeURIComponent(name)}=''; max-age=-1`
    }

    static get(name, decode = false) {
        const cookie = document.cookie + ';';

        if (!cookie) {
            return null;
        }

        const pattern = new RegExp(`${encodeURIComponent(name)}=(.*?);`, 'i');
        const value = cookie.match(pattern) ? cookie.match(pattern)[1] : null;

        return decode && value ? this._decodeStr(value) : value;
    }

    static _encodeStr(string) {
        return btoa(encodeURIComponent(string));
    }

    static _decodeStr(string) {
        return decodeURIComponent(atob(string));
    }
}