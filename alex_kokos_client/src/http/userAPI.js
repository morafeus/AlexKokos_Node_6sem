import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password, email) => {
    const {data} = await $host.post('auth/signup', {login, email, password})
    console.log(data.access_token);
    return jwtDecode(data.access_token);
}

export const signin = async (login, password) => {
    const {data} = await $host.post('auth/signin', {login, password})
    return jwtDecode(data.access_token);
}

export const check = async (login, password, email) => {
    const response = await $host.post('auth/registration', {login, password, email})
    return response;
}