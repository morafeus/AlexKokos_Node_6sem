import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:3200/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:3200/'
})

const $refreshHost = axios.create({
    baseURL: 'http://localhost:3200/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

const refreshInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('refresh-token')}`
    console.log(localStorage.getItem('refresh-token'));
    return config
}

$authHost.interceptors.request.use(authInterceptor);
$refreshHost.interceptors.request.use(refreshInterceptor);

export {
    $host,
    $authHost,
    $refreshHost
}