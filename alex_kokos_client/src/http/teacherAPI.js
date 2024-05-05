import { $authHost, $host } from "./index";
import { check } from "./userAPI";

export const fetchTeachers = async () => {
    const {data} = await $host.get('courses/getall')
    return data;
}


export const fetchTeachersByDesc = async (desc) => {
    const {data} = await $authHost.get('users/getTeacherDesc/' + desc).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's teachers 401")});
        }
    });
    return data;
}

export const fetchOneTeacher = async(id) => {
    const {data} = await $host.get('users/getTeacherDesc/' + id).catch(async function  (error) {
        const original = error.config;
        if (error.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's teachers 401")});
        }
    });
    return data;
}