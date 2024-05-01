import { $authHost, $host, $refreshHost } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password, email) => {
    const {data} = await $host.post('auth/signup', {login, email, password})
    return jwtDecode(data.access_token);
}

export const signin = async (login, password) => {
    const {data} = await $host.post('auth/signin', {login, password})
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('refresh-token', data.refresh_token)
    return jwtDecode(data.access_token);
}

export const logoutFunc = async() => {
    await $authHost.get('auth/logout').catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("401")});
        }
    });

}

export const check = async () => {

    try
    {
        const {data} = await $refreshHost.get('auth/refresh');
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token)
        return jwtDecode(data.access_token);
    }
    catch
    {
        console.log('401 refresh');
    }
}