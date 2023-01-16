import { Component, OnInit } from '@angular/core';
import { frameAnimation } from 'src/app/animations/app.animation';
import { Router } from '@angular/router';
import { individualAccount, AccountLogin } from 'src/app/models/authentication';
import { NgForm } from '@angular/forms';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [
     frameAnimation
  ]
})
export class AuthenticationComponent implements OnInit {

  constructor(private route:Router,
    private endpoint: EndpointsService,
    private notifyService: NotificationService,) { }
  page:any

  passwordPtn = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  individualLog = new AccountLogin('','')
  individualReg = new individualAccount('','','',0,'','',0,'',0,'','','','','','','',this.individualLog)
  password2 = '';
  response:any;
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
    this.individualReg.supplierCategoryId = 1;
    this.page='five'
  }

  Iloc(data:NgForm){
    console.log(this.individualReg);
    console.warn(data);
    data.resetForm;
    this.page='six'
  }
  
  bindividual(){
    this.page='five'
  }
  Ipassword( data:NgForm){
    console.log(this.individualReg);
    console.warn(data);
    this.page='seven'
  }
  
  bIloc(){
    this.page='six'
  }
  business(){
    this.individualReg.supplierCategoryId = 2;
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
  registerIndividual(data:NgForm){
    console.log(this.individualLog);
    console.warn(data);
    console.log('data sent to the enpoint',this.individualReg);
    this.endpoint.individualAccount(this.individualReg).subscribe((data)=>{
      console.log(data);
      this.response = data;
      if (this.response.responseCode == '00'){
        this.page='otp';
      }
      else{
        this.notifyService.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notifyService.showError(error.error.responseMsg);
    })
    
  }
  notify(){
    this.notifyService.showError('Tostr test')
    console.log('toatr service');
    
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
