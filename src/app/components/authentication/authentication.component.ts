import { Component, OnInit } from '@angular/core';
import { frameAnimation, slideInAnimation } from 'src/app/animations/app.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [
    slideInAnimation, frameAnimation
  ]
})
export class AuthenticationComponent implements OnInit {

  constructor(private route:Router) { }
  page:any
  ngOnInit(): void {
    this.page='one'
  }
  bHome(){
    this.page='one'
  }
  login(){
    this.page='two'
  }
  bLogin(){
    this.page='two'
  }
  lpassword(){
    this.page='three'
  }
  register(){
    this.page='four'
  }
  individual(){
    this.page='five'
  }
  Iloc(){
    this.page='six'
  }
  bindividual(){
    this.page='five'
  }
  Ipassword(){
    this.page='seven'
  }
  bIloc(){
    this.page='six'
  }
  business(){
    this.page='eight'
  }
  BLoc(){
    this.page='nine'
  }
  bBusiness(){
    this.page='eight'
  }
  businessContact(){
    this.page='ten'
  }
  bBLoc(){
    this.page='nine'
  }
  businessPassword(){
    this.page='eleven'
  }
  bBusinessContact(){
    this.page='ten'
  }
  otp(){
    this.page='otp'
  }
  resetPassword(){
    this.page='twelve'
  }
  dashBoard(){
    this.route.navigate(['/dashboard']);
  }
  move(e:any,p:any,c:any,n:any){
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if(length == maxlength){
      if(n != ''){ n.focus();}}
      if(e.key === 'Backspace'){
        if(p != ''){p.focus();}}
  }

}
