import { Component, OnInit } from '@angular/core';
import { frameAnimation } from 'src/app/animations/app.animation';
import { Router } from '@angular/router';
import { individualAccount, AccountLogin, CreateBussiness, Login } from 'src/app/models/authentication';
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
    private notifyService: NotificationService,
    ) { }
  page:any

  passwordPtn = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  individualLog = new AccountLogin('','');
  accountLogin = new Login('','');
  individualReg = new individualAccount('','','',0,'','',0,'',0,'','','','','','','',this.individualLog);
  bussinessReg = new CreateBussiness('','',0,'',0,'',0,'','','','','','','',this.individualLog);
  password2 = '';
  firstName = '';
  lastName = '';
  statelga = '';
  response:any;
  states:any=[];
  lga:any = [];
  otpEmail:any='';
  bizType:any = [];
  ngOnInit(): void {
    localStorage.clear();
    this.page='one'
    this.getStates();
    this.getBizTypes();
  }
  getBizTypes(){
    this.endpoint.getBusinessType().subscribe((data)=>{
      this.response = data;
      if (this.response.responseCode == '00'){
        this.bizType=this.response.responseData;
      }
      else{
        this.notifyService.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notifyService.showError(error.error.responseMsg);
    })
  }
  getStates(){
    this.endpoint.getStates().subscribe((data)=>{
      this.response = data;
      if (this.response.responseCode == '00'){
        this.states=this.response.responseData;
      }
      else{
        this.notifyService.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notifyService.showError(error.error.responseMsg);
    })
  }

  
  dashBoard(){
    this.endpoint.supplierLogin(this.accountLogin).subscribe((data)=>{
      this.response = data;      
      if (this.response.responseCode == '00'){
        let loginData = this.response.responseData;
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('profileId', loginData.userProfile.id)
        let userProfile = loginData.userProfile;
        console.log(userProfile);
        this.route.navigate(['/dashboard']);
      }
      else{
        this.notifyService.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notifyService.showError(error.error.title);
    })
  }
  getlga(value: any) {
    this.individualReg.state = value.split(',')[1];
    this.individualReg.stateId = value.split(',')[0];
    this.endpoint.getLga(value.split(',')[0]).subscribe(data => {
      this.response = data;  
        this.lga= this.response.responseData })
  }
  getLgaBiz(value:any){
    this.bussinessReg.state = value.split(',')[1];
    this.bussinessReg.stateId = value.split(',')[0];
    this.endpoint.getLga(value.split(',')[0]).subscribe(data => {
      this.response = data;  
        this.lga= this.response.responseData })
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
    this.bussinessReg.supplierCategoryId = 2;
    this.page='eight'
  }
  BLoc(data:NgForm){
    console.log(this.bussinessReg);
    this.page='nine'
  }

  bBusiness(){
    this.page='eight'
  }
  businessContact(data:NgForm){
    console.log(this.bussinessReg);
    this.page='ten'
  }
  bBLoc(){
    this.page='nine'
  }
  businessPassword(data:NgForm){
    this.bussinessReg.primaryContactName = this.firstName+' '+this.lastName;
    console.log(this.bussinessReg);
    this.page='eleven'
  }
  bBusinessContact(){
    this.page='ten'
  }
  registerIndividual(data:NgForm){
    console.log(this.individualLog);
    console.warn(data);
    this.otpEmail = this.individualLog.email;
    console.log('data sent to the enpoint',this.individualReg);
    this.endpoint.individualAccount(this.individualReg).subscribe((data)=>{
      console.log(data);
      this.response = data;
      if (this.response.responseCode == '00'){
        this.page='otp';
        this.notifyService.showSuccess(this.response.responseData)
      }
      else{
        this.notifyService.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notifyService.showError(error.error.responseMsg);
    })
    
  }
  registerBusiness(data:NgForm){
    this.otpEmail = this.individualLog.email;
    this.endpoint.businessAccount(this.bussinessReg).subscribe((data)=>{
      console.log(data);
      this.response = data;
      if (this.response.responseCode == '00'){
        this.page='otp'
      }
      else{
        this.notifyService.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notifyService.showError(error.error.responseMsg);
    })
  }

  otpCode:any
  getOtp(item: any) {
    this.otpCode = item.txt1 + item.txt2 + item.txt3 + item.txt4 + item.txt5 + item.txt6;
    console.warn(this.otpCode);
    this.endpoint.verifyCode({ email: this.otpEmail, code: this.otpCode }).
      subscribe((data) => {
        this.response = data;
        if (this.response.responseCode == '00') {
          this.page='two'
        }
        else {
          this.notifyService.showError(this.response.responseMsg)
          this.page = 'otp';
        };
      },(error) => {
        this.notifyService.showError(error.error.responseMsg);
      } );
  }
resendOtp(){
  this.endpoint.resendVerificationCode(this.otpEmail).subscribe((data)=>{
    this.response = data;
    if (this.response.responseCode == '00'){
      this.notifyService.showSuccess(this.response.responseMsg)
    }
    else{
      this.notifyService.showError(this.response.responseMsg)
    }
  },(error) => {
    this.notifyService.showError(error.error.responseMsg);
  } )
}
 
  otp(){
    this.page='otp'
  }
  
  resetPassword(){
    this.page='twelve'
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
