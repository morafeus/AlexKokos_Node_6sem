import { makeAutoObservable } from "mobx"

export default class CourseStore {
    constructor () {
        this._courses = []   

        this._desciplines = [
            {  descipline_name: 'Math'},
            {  descipline_name: 'English'},
        ]
        makeAutoObservable(this);
    }

    setDesciplines(desciplines){
        this._desciplines = desciplines;
    }

    setCourses(courses){
        this._courses = courses;
    }

    

    get desciplines() {
        return this._desciplines;
    }

    get courses() {
        return this._courses;
    }

  

}