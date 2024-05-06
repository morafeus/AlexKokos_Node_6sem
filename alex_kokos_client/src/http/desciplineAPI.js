import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import { check } from "./userAPI";

export const createDescipline = async (descipline) => {
    const {data} = await $authHost.post('desciplines/create', descipline).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's courses 401")});
        }
        else{
            let e;
            if(Array.isArray(err.response.data.message)){
                (err.response.data.message).forEach(elem => {
                   e += elem +'\n'
                });
                alert(e);
            }
            else{
                alert(err.response.data.message)
            }
        }
    });
    return data;
}

export const fetchDesciplines = async (login, password) => {
    const {data} = await $host.get('desciplines/getall', {login, password}).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's courses 401")});
        }
        else{
            let e;
            if(Array.isArray(err.response.data.message)){
                (err.response.data.message).forEach(elem => {
                   e += elem +'\n'
                });
                alert(e);
            }
            else{
                alert(err.response.data.message)
            }
        }
    });
    return data;
}

