import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createDescipline = async (descipline) => {
    const {data} = await $host.post('desciplines/create', descipline)
    return data;
}

export const fetchDesciplines = async (login, password) => {
    const {data} = await $authHost.get('desciplines/getall', {login, password})
    return data;
}

