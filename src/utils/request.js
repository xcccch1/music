import axios from 'axios'

export const request = axios.create({
    baseURL: '/a',
});

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

export const requestArr = []

request.interceptors.request.use(config => {
    requestArr.push(config)
    config.cancelToken = source.token;
    return config;
},
    error => {
        return Promise.reject(error);
    }
);


