import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor() { }

  private navbar = new Subject<string>();
  sharednavbar$ = this.navbar.asObservable();
  getnavbar(message:string){
    this.navbar.next(message)
  }
  
  private screenWidth = new Subject<boolean>();
  sharedscreenWidth = this.screenWidth.asObservable();

  getscreenWidth(message: boolean){
    this.screenWidth.next(message);
  }

  private screenSize = new Subject<number>();
  screenSize$ = this.screenSize.asObservable();

  getscreenSize(message: number){
    this.screenSize.next(message);
  }

  private name = new BehaviorSubject('');
  sharedUserName$ = this.name.asObservable();

  getUserName(message: string ){
    this.name.next(message);
  }

  private userId = new BehaviorSubject('');
  userId$ =  this.userId.asObservable();

  getUserId(message:string){
    this.userId.next(message);
  }

  private service = new BehaviorSubject('');
  service$= this.service.asObservable();

  getService(message:string){
    this.service.next(message)
  }
}
