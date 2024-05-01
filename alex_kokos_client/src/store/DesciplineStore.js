import { makeAutoObservable, _allowStateChangesInsideComputed } from "mobx"

export default class DesciplineStore {
    constructor () {
        this._desciplines = []
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