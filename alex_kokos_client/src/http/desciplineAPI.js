import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import { check } from "./userAPI";

export const createDescipline = async (descipline) => {
    const {data} = await $authHost.post('desciplines/create', descipline).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's desciplines 401")});
        }
    });
    return data;
}

export const fetchDesciplines = async (login, password) => {
    const {data} = await $host.get('desciplines/getall', {login, password}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's desciplines 401")});
        }
    });
    return data;
}

