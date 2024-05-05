import { makeAutoObservable } from "mobx"

export default class TeachersStore {
    constructor () {
        this._teachers = [
        ] 
        this._selectedType = {}
        makeAutoObservable(this);
    }

    setSelectedType(type){

        this._selectedType = type;
   }


    setTeachers(teachers){
        this._teachers = teachers;
    }


    get selectedType(){
        return this._selectedType;
    }

    get teachers() {
        return this._teachers
    }
}