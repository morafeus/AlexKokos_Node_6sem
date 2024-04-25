import { makeAutoObservable, _allowStateChangesInsideComputed } from "mobx"

export default class DesciplineStore {
    constructor () {
        this._desciplines = [
            { descipline_id: 1, descipline_name: 'Math'},
            { descipline_id: 2, descipline_name: 'English'},
            { descipline_id: 3, descipline_name: 'IT'},
        ]
       this._selectedType = {}
        makeAutoObservable(this);
    }

   setSelectedType(type){
        this._selectedType = type;
   }

    setDesciplines(desciplines){
        this._desciplines = desciplines;
    }

    get selectedType(){
        return this._selectedType;
    }

    get desciplines() {
        return this._desciplines;
    }

   

}