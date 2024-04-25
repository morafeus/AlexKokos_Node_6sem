import { makeAutoObservable } from "mobx"

export default class CourseStore {
    constructor () {
        this._courses = [
            {  course_id : 1,course_name: 'math', course_cost: 300, course_description: 'hello course', course_descipline: 'Math'},
            {  course_id : 2,course_name: 'math1', course_cost: 100, course_description: 'hello course', course_descipline: 'Math'},
            {  course_id : 3,course_name: 'math2', course_cost: 700, course_description: 'hello course', course_descipline: 'Math'},
            {  course_id : 4,course_name: 'math3', course_cost: 400, course_description: 'hello course', course_descipline: 'Math'},
        ]   

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