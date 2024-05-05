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

export const createTeach = async (fio, email, password, descipline) => {
    if(!fio || !email || !password || !descipline){

          throw Error("invalid params");
        }
        const {data} = await $authHost.post('auth/teacher', {fio, email, descipline, password}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's desciplines 401")});
        }
    });
    
    return data;
}

export const getStudent = async () => {
    const data = $authHost.get('users/getStudent').catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's desciplines 401")});
        }
    });
    return data
}

export const updateBalance = async (balance) => {
    const data = $authHost.post('users/balance', {balance}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's desciplines 401")});
        }
    });
    return data
}