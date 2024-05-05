import { makeAutoObservable } from "mobx"

export default class CourseStore {
    constructor () {
        this._courses = []   

        this._desciplines = [
        ]

        this._page = 1
        this._totalCount = 0
        this._limit = 8
        this._name = ''
        this._price = 0
        this._selectedDescipline = {}
        makeAutoObservable(this);
    }

    setSelectedDescipline(descipline){
        this.setPage(1);
        this._selectedDescipline = descipline;
    }

    setDesciplines(desciplines){
        this._desciplines = desciplines;
    }

    setCourses(courses){
        this._courses = courses;
    }

    setPage(page){
        this._page = page
    }
    
    setTotalCount(totalCount){
        this._totalCount = totalCount
    }

    setLimit(limit){
        this._limit = limit;
    }

    setPrice(price){
        this.setPage(1);
        this._price = price;
    }

    setName(name){
        this.setPage(1);
        this._name = name
    }

    get selectedDescipline(){
        return this._selectedDescipline
    }

    get price(){
        return this._price;
    }

    get name() {
        return this._name
    }
    
    get page(){
        return this._page;
    }

    get totalCount(){
        return this._totalCount;
    }

    get limit(){
        return this._limit
    }

    get desciplines() {
        return this._desciplines;
    }

    get courses() {
        return this._courses;
    }

  

}