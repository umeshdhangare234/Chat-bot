import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn:'root'
}) 
export class UserService{
    currentUser:Subject<any> = new BehaviorSubject<any>('a'); 

    public setCurrentUser(newUser:User){
        this.currentUser.next(newUser);
    }
}