import { makeAutoObservable } from "mobx"

export default class TestStore {
    constructor () {
        this._tests = [
            {  test_id : 1,test_name: 'math', course_cost: 300, test_desc: 'hello course', course_descipline: 'Math'},
            {  test_id : 2,test_name: 'math1', course_cost: 100, test_desc: 'hello course', course_descipline: 'Math'},
            {  test_id : 3,test_name: 'math2', course_cost: 700, test_desc: 'hello course', course_descipline: 'Math'},
            {  test_id : 4,test_name: 'math3', course_cost: 400, test_desc: 'hello course', course_descipline: 'Math'},
        ] 
        makeAutoObservable(this);
    }

    setTeachers(tests){
        this._tests = tests;
    }

    get tests() {
        return this._tests
    }
}