import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createDescipline = async (descipline) => {
    const {data} = await $host.post('desciplines/create', descipline)
    return data;
}

export const fetchDesciplines = async (login, password) => {
    const {data} = await $host.post('desciplines/main', {login, password})
    localStorage.setItem('token', data.access_token);
    return jwtDecode(data.access_token);
}

export const check = async () => {
    const {data} = await $authHost.get('auth/registration');
    localStorage.setItem('token', data.access_token);
    return jwtDecode(data.access_token);
}