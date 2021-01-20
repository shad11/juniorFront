export default class Request {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this.headers = {};
    };

    addHeader(name, value) {
        this.headers[name] = value;
    }

    get(url) {
        const options = {
            method: 'GET',
            headers: {...this.headers}
        };

        return this._fetchUrl(url, options);
    }

    post(url, bodyObj) {
        const options = {
            method: 'POST',
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json',
                ...this.headers
            }
        };

        return this._fetchUrl(url, options);
    }

    put(url, bodyObj) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json',
                ...this.headers
            }
        };

        return this._fetchUrl(url, options);
    }

    delete(url, bodyObj = {}) {
        const options = {
            method: 'DELETE',
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json',
                ...this.headers
            }
        };

        return this._fetchUrl(url, options);
    }

    _fetchUrl(url, options = {}) {
        const path = `${this._baseUrl}/${url}`;

        return fetch(path, options)
            .then(response => response.json())
            .catch(error => new Promise((resolve, reject) => reject(`Request error: ${error}`)));
    }
}