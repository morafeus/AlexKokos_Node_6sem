import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password, email) => {
    const {data} = await $host.post('auth/signup', {login, email, password})
    return jwtDecode(data.access_token);
}

export const signin = async (login, password) => {
    const {data} = await $host.post('auth/signin', {login, password})
    localStorage.setItem('token', data.access_token);
    return jwtDecode(data.access_token);
}

export const check = async () => {
    //const {data} = await $authHost.get('auth/registration');
    //localStorage.setItem('token', data.access_token);
    const data = localStorage.getItem('token');
    //return jwtDecode(data.access_token);
    return jwtDecode(data);
}