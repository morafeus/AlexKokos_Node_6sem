import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import { check } from "./userAPI";

export const createDescipline = async (descipline) => {
    const {data} = await $host.post('desciplines/create', descipline)
    return data;
}

export const fetchDesciplines = async (login, password) => {
    const {data} = await $authHost.get('desciplines/getall', {login, password}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("401")});
        }
    });
    return data;
}

