import { makeAutoObservable } from "mobx"

export default class TeachersStore {
    constructor () {
        this._teachers = [
           {user_ident: 1, fio: "alex", email:"teacher@gmail.com", descipline: "Math"}
        ] 
        makeAutoObservable(this);
    }

    setTeachers(teachers){
        this._teachers = teachers;
    }

    get teachers() {
        return this._teachers
    }
}