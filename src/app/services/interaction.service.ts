import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
}
