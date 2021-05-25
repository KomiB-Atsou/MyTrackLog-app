import axios from 'axios';
import config from '../config.json';
import moment from "moment";

export default class {

    static getAll = async categoryId => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${config.api}/tasks/all`, {categoryId: categoryId})
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static add = async obj => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${config.api}/tasks`, obj)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static update = async (id, obj) => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${config.api}/tasks/${id}`, obj)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static get = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${config.api}/tasks/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static delete = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.delete(`${config.api}/tasks/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }
}