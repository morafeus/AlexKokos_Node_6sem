import { $authHost, $host } from "./index";
import { check } from "./userAPI";

export const fetchTeachers = async () => {
    const {data} = await $host.get('courses/getall')
    return data;
}


export const fetchTeachersByDesc = async (desc) => {
    const {data} = await $authHost.get('users/getTeacherDesc/' + desc).catch(async function  (err) {
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

export const fetchOneTeacher = async(id) => {
    const {data} = await $host.get('users/getTeacherDesc/' + id).catch(async function  (err) {
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