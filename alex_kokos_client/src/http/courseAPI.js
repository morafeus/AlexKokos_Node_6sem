import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createCourse = async (course) => {
    const {data} = await $authHost.post('courses/create', course).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's desciplines 401")});
        }
    });
    return jwtDecode(data.access_token);
}

export const fetchCourses = async (price, descip, name) => {
    const {data} = await $host.get('courses/getall', {name, price, descip})
    return data;
}

export const fetchOneCourse = async(id) => {
    console.log(id);
    const {data} = await $host.get('courses/getone/' + id);
    return data;
}
