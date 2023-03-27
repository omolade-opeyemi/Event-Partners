import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AddService, Services, RequestAction } from 'src/app/models/services';
import { FileStorageService } from 'src/app/services/file-storage.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { Invoicing } from 'src/app/models/invoicing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationExampleDialogComponent } from 'src/app/dialog-animation-example-dialog/dialog-animation-example-dialog.component';
import { CreateAccount } from 'src/app/models/accreditation';




interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  date: string;
  icon: String
}
interface Requests {
  creator: string;
  flag: string;
  name: string;
  service: string;
  amount: number;
  date: string;
  icon: String
}
const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 5,
    date: 'Sept 26, 2022',
    icon: 'more_horz'
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
    date: 'Sept 26, 2022',
    icon: 'more_horz'
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
    date: 'Sept 26, 2022',
    icon: 'more_horz'
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
    date: 'Sept 26, 2022',
    icon: 'more_horz'
  }
];

const REQUESTS: Requests[] = [
  {
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount: 2022,
    date: 'Sept 26, 2022',
    icon: 'more_horiz'
  }, {
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount: 2022,
    date: 'Sept 26, 2022',
    icon: 'more_horiz'
  }, {
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount: 2022,
    date: 'Sept 26, 2022',
    icon: 'more_horiz'
  }, {
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount: 2022,
    date: 'Sept 26, 2022',
    icon: 'more_horiz'
  }, {
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount: 2022,
    date: 'Sept 26, 2022',
    icon: 'more_horiz'
  }
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
  files: File[] = [];
  profileImgeFile: any;

  constructor(config: NgbRatingConfig,
    private interact: InteractionService,
    public router: Router,
    configModal: NgbModalConfig,
    private offcanvasService: NgbOffcanvas,
    private endpoint: EndpointsService,
    private notify: NotificationService,
    private fileStorageService: FileStorageService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,



    private modalService: NgbModal) {
    config.max = 5;
    config.readonly = true;
    configModal.backdrop = 'static';
    configModal.keyboard = false;


  }

  createAccount = new CreateAccount(0,'','','','','')
  invoicing = new Invoicing('','','','','',true,0,[]);
  addServices = new AddService(0, '','', '', '', 0,false, []);
  addServicesNew = new AddService(0, '','', '', '', 0,false, []);
  servicess = new Services(0,0,0);
  requestAction= new RequestAction(0,0,[],true);
  closeResult: string | undefined;
  collapsed = false
  screenWidth = 0
  authpage = ''
  countries = COUNTRIES;
  requests = REQUESTS;
  page = '';
  request = ''
  requestHead = ''
  sidebar = false;
  showFiller = true;
  response: any;
  status = ''
  userName:any;
  totalLength: any;
  pg: number = 1;
  panelOpenState = false;
  public isCollapsed = false;
  reload: any;


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.page = 'one';
      this.serviceCategory();
      this.getSupplierServices();
      this.getSupplierDashboard();
      this.accreditationStatus();
      this.getRequests();
      this.getSupplierService_v2()
      this.interact.sharedscreenWidth.subscribe(message => { this.collapsed = message });
      this.interact.screenSize$.subscribe(message => { this.screenWidth = message });
      this.interact.getnavbar("two");
      this.userName = localStorage.getItem('name')
      this.interact.getUserName(String(localStorage.getItem('name')));
      this.interact.getUserId(String(localStorage.getItem('profileId')))
      this.interact.service$.subscribe(message => {
        this.reload = message;
        if( this.reload == 'yes'){
          this.getSupplierService_v2();
          this.getSupplierDashboard();
        }
      })
    }
    else {
      this.router.navigate(['/']);
    }
  }

  setAccount:any;
  setUpAccount(){
    this.spinner.show();
    this.createAccount.profileId = Number(localStorage.getItem('profileId'))
    this.endpoint.createAccount(this.createAccount).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if(this.response.responseCode == '00'){
        this.notify.showSuccess(this.response.responseMsg);
        this.setAccount = this.response.responseData;
        this.getSupplierDashboard();
        this.page = 'one';
        this.resetForm();
      }else{
        this.notify.showError(this.response.responseMsg)
      }
    },
    (error) => {
      this.notify.showError(error.message);
      this.spinner.hide();
    }
    )
  }

  resetForm(){
    this.createAccount.accountName = '';
    this.createAccount.bankAccountNumber = '';
    this.createAccount.bankCode = '';
    this.createAccount.bankName = '';
    this.createAccount.bvn = '';
    this.createAccount.profileId = 0
  }

  bank:any
  getBank(data:any){
    console.log(data);
    this.createAccount.bankName = data.split(',')[0];
    this.createAccount.bankCode = data.split(',')[1];
    this.createAccount.accountName
  }

  testModal(nodal:any){
    this.modalService.open(nodal)
  }
  accountSetup(){
    this.page = 'account'
    this.getBanks();
    this.modalService.dismissAll();
  }

  banks:any;
  getBanks(){
    this.endpoint.getBank().subscribe((data)=>{
      this.response = data;
      if(this.response.responseCode == '00'){
        this.banks = this.response.responseData;
      }else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notify.showError(error.message);
    })
  }
  openDialog(i: any): void {
    this.dialog.open(DialogAnimationExampleDialogComponent, {
      width: '400px',
      data: i,
    });
  }

  createSupplierInvoice(data:any){
    this.invoicing.isSent = data;
    console.log(this.invoicing);
    this.spinner.show();
  this.endpoint.createSupplierInvoice(this.invoicing).subscribe((data)=>{
    this.response = data;
    this.spinner.hide();
    if( this.response.responseCode == '00'){
      this.notify.showSuccess('successfull')
    }
    else{
      this.notify.showError(this.response.responseMsg)
    }
  },(error) => {
    this.notify.showError(error.message);
    this.spinner.hide();
  })
}

total = 0;
onChangeDiscount(){

  var disc = (this.invoicing.discount / 100) * this.subTotal;
  var vat = 0.075 * this.subTotal;
  var total = this.subTotal - disc 
  this.total = total
}
invoiceDetail:any;
// supplierInvoiceDetails:any[]=[]
subTotal:any;

  openInvoiceCreation(content: any,eventId:any) {
    this.spinner.show();
    this.endpoint.generateSupplierInvoiceDetails(Number(localStorage.getItem('profileId')),
    eventId).subscribe(data => {
      this.response = data;
      this.spinner.hide();
      if(this.response.responseCode == '00'){
        this.invoiceDetail = this.response.responseData;
        this.invoicing.inovieceNumber = this.invoiceDetail.inovieceNumber;
        this.invoicing.date = this.invoiceDetail.date.split('T')[0] ;
        this.invoicing.recipientName = this.invoiceDetail.recipientName;
        this.invoicing.email = this.invoiceDetail.email;
        this.invoicing.address = this.invoiceDetail.address;
        var subtotal = 0
        this.invoicing.serviceDesriptionDetails = this.invoiceDetail.serviceDesriptionDetails;
        for(let i=0;i<this.invoicing.serviceDesriptionDetails.length;i++){
          subtotal  += this.invoicing.serviceDesriptionDetails[i].amount
        }
        this.subTotal = subtotal
        this.total = this.subTotal;

        this.modalService.open(content, { size: 'lg' });
      }else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notify.showError(error.error.title);
      this.spinner.hide();
    })
    
  }
  accreditation() {
    this.router.navigate(['/accreditation'])
  }
  categoryResponse: any;
  categoryData: any;
  serviceCategory() {
    this.endpoint.getServiceCategories().subscribe((data) => {
      this.categoryResponse = data;
      if (this.categoryResponse.responseCode == '00') {
        this.categoryData = this.categoryResponse.responseData;
      }
      else {
        this.notify.showError(this.categoryResponse.responseData)
      }
    }, (error) => {
      this.notify.showError(error.error.title);
    })
  }

  getServiceTypes(){

  }

  supplierDashboard:any
  getSupplierDashboard(){
    this.endpoint.getSupplierDashboard(Number(localStorage.getItem('profileId'))).subscribe((data)=>{
      this.response = data;
      if(this.response.responseCode == '00'){
        this.supplierDashboard = this.response.responseData
      }
      else{
        this.notify.showError(this.response.responseMsg)
      }
    }, (error) => {
      this.notify.showError(error.error.title);
    })
  }

  accreditationStatus() {
    this.endpoint.getAccreditationStatus(Number(localStorage.getItem('profileId'))).subscribe((data) => {
      this.response = data
      this.status = this.response.responseData

    })
  }

  services_v2: any[]=[]
  getSupplierService_v2(){
    this.endpoint.getSupplierService_v2(Number(localStorage.getItem('profileId'))).subscribe((data)=>{
      this.response = data;
      if(this.response.responseCode == '00'){
        this.services_v2 = this.response.responseData;
      }else{
        this.notify.showError(this.response.responseMsg)
      }
    }, (error) => {
      this.notify.showError(error.message);
    })
  }

  supplierResponse: any;
  supplerData: any[]=[ ];
  supplierCategory: any[] = []
  supplierServices: any[] = []
  getSupplierServices() {
    // Number(localStorage.getItem('profileId'))
    this.endpoint.getSupplierService(Number(localStorage.getItem('profileId'))).subscribe((data) => {
      this.supplierResponse = data;
      console.warn(this.supplierResponse);
      if (this.supplierResponse.responseCode == '00') {
        this.supplerData = this.supplierResponse.responseData;    
        this.filterd = this.supplerData
      }
      else {
        this.notify.showError(this.supplierResponse.responseMsg)
      }
    }, (error) => {
      this.notify.showError(error.message);
    })
  }

  search = ''
  filterd:any[] = []
  filter(data:string){
    let filterObj =  []
    if( data.length == 0){
      filterObj = this.supplerData
    }
    else{
      filterObj = this.supplerData.filter((item) => item.serviceCategory.includes(data) || item.serviceType.includes(data));
    }
    this.filterd = filterObj
  }
  
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end', backdrop: false });
  }
  dashBoard() {
    this.page = 'one'
  }
  pendingReq() {
    this.page = 'requests'
    this.requestHead = 'pending'
    this.request = 'pending'
  }
  requestAtten() {
    this.page = 'requests'
    this.requestHead = 'attended'
    this.request = 'attended'
  }
  pendingRequest() {
    this.requestHead = 'pending'
    this.request = 'pending'
  }
  requestAttended() {
    this.requestHead = 'attended'
    this.request = 'attended'
  }
  requestsDetail: any[]=[]
  attendedRequestDetail: any[]=[]

  getRequestDetail(){
    this.spinner.show();
    this.events = [];
    this.attendedRequestDetail = []
    this.endpoint.getRequestDetail(Number(localStorage.getItem('profileId')), this.eventId).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if( this.response.responseCode == '00'){
        this.requestsDetail = this.response.responseData;
          var item = this.requestsDetail.filter((item)=> item.isTreated == true);
          this.attendedRequestDetail=item

        console.log(this.attendedRequestDetail);
        
      }
      else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notify.showError(error.error.responseMsg);
      this.spinner.hide();
    })
  }

  isOpen:boolean = false
  getDrawerStatus(drawer:any){
    this.eventData = ''
    this.isOpen = false;
    if(drawer._opened){
      this.isOpen = true;
    }
  }

  eventData:any = ''
  eventId:any;
  toggleSideBar(data:any,drawer:any) {
    this.eventData = ''
    this.eventId = data.eventId;
    this.isOpen = false;
    this.eventData = data;
    console.log(this.eventData);
    if(drawer._opened){
      this.getRequestDetail();
      this.isOpen = true;
    }
    
    
  }

  events: any[]=[]
  isChecked:any
  checkValue(data: any, item: any){
    if ( data.target.checked){
      this.events.push(item)
      console.log(this.events);
      
    }
    else{
      const index = this.events.indexOf(item);
      this.events.splice(index, 1)
      
    }
    
 }
  eventRequestAction(data:boolean){
    this.requestAction.services = [];
    for(let i=0;i < this.events.length; i++){
      var servicess = new Services(0,0,0)
      servicess.quantity = this.events[i].quantity;
      servicess.serviceId = this.events[i].serviceId;
      servicess.requestId = this.events[i].requestId;
      // this.servicess.quantity = this.events[i].quantity;
      // this.servicess.serviceId = this.events[i].serviceId;
      this.requestAction.services.push(servicess)
    }
    this.requestAction.supplierId = Number(localStorage.getItem('profileId'));
    this.requestAction.eventId = this.events[0].eventId;
    this.requestAction.accept = data;
    console.log(this.requestAction);
    
    
    this.spinner.show();
    this.endpoint.eventRequestAction(this.requestAction).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if( this.response.responseCode == '00'){
        this.notify.showInfo(this.response.responseMsg)
        this.getRequests();
        this.getRequestDetail();

      }
      else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notify.showError(error.error.responseMsg);
      this.spinner.hide();
    })
  }

  isauthRouth() {
    this.authpage = '/auth';
    return this.router.url === '/auth';
  }
  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  open(addService: any,account:any) {
    if(this.supplierDashboard.paymentAccountStatus == 'SUCCESSFUL'){
      this.modalService.open(addService);
    this.files = []
    this.addServices.pictureImages = []
    this.addServices = this.addServicesNew;
    console.log(this.addServices);
    }else{
      this.modalService.open(account);
    }
    
  }
  addService() {
    this.modalService.dismissAll()
  }
  serviveTypes:any
  getCategory(value:any){
    this.addServices.serviceCategory =  value.split(',')[1];
    this.endpoint.getServiceTypes(value.split(',')[0]).subscribe(data =>{
      this.response = data;
      this.serviveTypes = this.response.responseData

    })
    

  }
  serviceSuccess(success: any, data: any) {
    this.addService();
    this.spinner.show();
    this.addServices.profileId = Number(localStorage.getItem('profileId'));
    this.addServices.serviceType = data.serviceType;
    this.addServices.serviceCaption = data.serviceCaption;
    this.addServices.serviceDescription = data.serviceDescription;
    this.addServices.serviceRate = data.rate;
    this.addServices.negotiable = data.negotiable;
    if( data.negotiable == '')this.addServices.negotiable = false;
    this.endpoint.addNewService(this.addServices).subscribe((value) => {
      this.response = value;
      this.spinner.hide();
      if (this.response.responseCode == '00') {
        this.url = [];
        this.notify.showSuccess(this.response.responseMsg)
        this.modalService.open(success, { centered: true });
        this.getSupplierService_v2();
        this.getSupplierDashboard();

      }
      else {
        this.notify.showError(this.response.responseMsg)
      }
    }, (error) => {
      this.notify.showError(error.error.responseMsg);
      this.spinner.hide();
    })
  }
  pendingRequests: any[]=[]
  attendedRequests: any[]=[]
  getRequests(){
    this.spinner.show();
    this.endpoint.getRequests(Number(localStorage.getItem('profileId'))).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if( this.response.responseCode == '00'){
        this.pendingRequests = this.response.responseData.pendingRequests;
        this.attendedRequests = this.response.responseData.attendedRequests;
      }
      else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notify.showError(error.error.responseMsg);
      this.spinner.hide();
    })
  }

  imageUpload(selectedfile: any) {
    this.spinner.show();
    this.fileStorageService.UploadFileFromDataUrl(selectedfile);
    this.fileStorageService.onUploadFinished.subscribe(
      (resp: any) => {
        this.spinner.hide();
        if (resp.responseCode != "00") {
          this.notify.showError('System error, A system error has occured');
        }
        else {
          this.imageUrl = resp.responseData;
          this.url.push(this.imageUrl);
          this.addServices.pictureImages = this.url;

        }
      }, (error) => {
        this.notify.showError(error.message);
        this.spinner.hide();
      }
    )
  }
  imageUrl: string = '';
  url: string[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.profileImageUpload()
    console.log(this.files);

    
  }

  profileImageUpload() {
    // for (let i = 0; i < this.files.length; i++) {
      // const [file] = this.files[i];
      // this.profileImgeFile = this.files[i];
      this.profileImgeFile = this.files[this.files.length - 1];

      this.imageUpload(this.profileImgeFile);
    // }
  }

  onRemove(event: File) {
    const index  = this.files.indexOf(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.url.splice(index, 1)
    console.log(this.files);
    console.warn(this.url);
    
    
  }


}
