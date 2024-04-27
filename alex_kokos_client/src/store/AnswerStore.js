import { makeAutoObservable } from "mobx"

export default class AnswerStore {
    constructor () {
        this._answers = [
            {  course_id : 1,course_name: 'math', course_cost: 300, course_description: 'hello course', course_descipline: 'Math'},
            {  course_id : 2,course_name: 'math1', course_cost: 100, course_description: 'hello course', course_descipline: 'Math'},
            {  course_id : 3,course_name: 'math2', course_cost: 700, course_description: 'hello course', course_descipline: 'Math'},
            {  course_id : 4,course_name: 'math3', course_cost: 400, course_description: 'hello course', course_descipline: 'Math'},
        ] 
        makeAutoObservable(this);
    }

    setTeachers(answers){
        this._answers = answers;
    }

    get answers() {
        return this._answers
    }
}