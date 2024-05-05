import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import { check } from "./userAPI";

export const createCourse = async (name, cost, description, descipline, teacher) => {
   
    const data = await $authHost.post('courses/create', {name, cost, description, descipline, teacher}).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
        }else{
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

export const fetchCourses = async (price, descipline, name, page = 1, limit = 8) => {
    const {data} = await $host.post('courses/getall', {name, price, descipline, page, limit}).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
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

export const fetchCoursesUser = async (price, descipline, name, page = 1, limit = 8) => {
    const {data} = await $authHost.post('courses/getallUser', {name, price, descipline, page, limit}).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
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

export const fetchOneCourse = async(id) => {
    const {data} = await $host.get('courses/getone/' + id).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
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

export const fetchOneCourseMy = async(id) => {
    const {data} = await $authHost.get('courses/getoneMy/' + id).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's course 401")});
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

export const buyCourse = async(id) => {
    const data = $authHost.post('courses/buy', {id}).catch(async function  (err) {
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
    return data
}

export const checkIsMy = async(id) => {
    const data = $authHost.post('courses/checkIsMy', {id}).catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            await check();
            $authHost.request(original).catch(() => {console.log("it's coures 401")});
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
    return data
}


export const addMaterial  = async(id, name, description) => {
    const data = $authHost.post('courses/addMaterial', {id, name, description}).catch(async function  (err) {
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
    return data
}

export const getMaterial  = async(id) => {
    console.log(id);
    const data = $authHost.post('courses/getMaterial', {id}).catch(async function  (err) {
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
    return data
}

export const delMaterial  = async(id) => {
    console.log(id);
    const data = $authHost.post('courses/delMaterial', {id}).catch(async function  (err) {
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
    return data
}


export const addTest  = async(test, id) => {
    const data = $authHost.post('courses/addTest', {test, id}).catch(async function  (err) {
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
    return data
}


export const GetTest  = async(id) => {
    const data = $authHost.post('courses/getTest', {id}).catch(async function  (err) {
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
    return data
}

export const DelTest  = async(id) => {
    const data = $authHost.post('courses/delTest', {id}).catch(async function  (err) {
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
    return data
}

export const GetStudsByTest  = async(id) => {
    const data = $authHost.post('courses/getStudsByTest', {id}).catch(async function  (err) {
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
    return data
}


export const SaveSuccess  = async(id) => {
    const data = $authHost.post('courses/saveSuccess', {id}).catch(async function  (err) {
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
    return data
}

export const deleteCourse  = async(id) => {
    const data = $authHost.post('courses/deleteCourse', {id}).catch(async function  (err) {
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
    return data
}

export const deleteUser  = async(name) => {
    const data = $authHost.post('users/deleteUser', {name}).catch(async function  (err) {
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
    return data
}
