import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import { check } from "./userAPI";

export const createCourse = async (name, cost, description, descipline, teacher) => {
    if(!name || !cost || !description || !descipline)
        throw Error("invalid params");
    const {data} = await $authHost.post('courses/create', {name, cost, description, descipline, teacher}).catch(async function  (error) {
        console.log(error);
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
        }
    });
    
    return data;
}

export const fetchCourses = async (price, descipline, name, page = 1, limit = 8) => {
    const {data} = await $host.post('courses/getall', {name, price, descipline, page, limit}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
        }
    });
    
    return data;
}

export const fetchOneCourse = async(id) => {
    const {data} = await $host.get('courses/getone/' + id).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
        }
    });
    return data;
}

export const buyCourse = async(id) => {
    const data = $authHost.post('courses/buy', {id}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's courses 401")});
        }
    });
    return data
}

export const checkIsMy = async(id) => {
    const data = $authHost.post('courses/checkIsMy', {id}).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's coures 401")});
        }
    });
    return data
}
