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


    private modalService: NgbModal) {
    config.max = 5;
    config.readonly = true;
    configModal.backdrop = 'static';
    configModal.keyboard = false;
  }

  addServices = new AddService(0, '','', '', '', 0,false, []);
  addServicesNew = new AddService(0, '','', '', '', 0,false, []);
  servicess = new Services(0,0);
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

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.page = 'one';
      this.serviceCategory();
      this.getSupplierServices();
      this.getSupplierDashboard();
      this.accreditationStatus();
      this.getRequests();
      this.interact.sharedscreenWidth.subscribe(message => { this.collapsed = message });
      this.interact.screenSize$.subscribe(message => { this.screenWidth = message });
      this.interact.getnavbar("two");
      this.userName = localStorage.getItem('name')
      this.interact.getUserName(String(localStorage.getItem('name')));
      this.interact.getUserId(String(localStorage.getItem('profileId')))

    }
    else {
      this.router.navigate(['/']);
    }
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
  toggleSideBar(data:any) {
    this.spinner.show();
    this.events = [];
    this.endpoint.getRequestDetail(Number(localStorage.getItem('profileId')), data).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if( this.response.responseCode == '00'){
        this.requestsDetail = this.response.responseData;
      }
      else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {
      this.notify.showError(error.error.responseMsg);
      this.spinner.hide();
    })
    
  }

  events: any[]=[]
  isChecked:any
  checkValue(event: any){
    if ( this.isChecked == true){
      console.log(this.isChecked);
      this.events.push(event)
    console.log(this.events);
    }
    else{
      const index = this.events.indexOf(event);
      this.events.splice(index, 1)
      console.log(this.events);
      console.log(this.isChecked);
    }
    
 }
  eventRequestAction(data:boolean){
    for(let i of this.events){
      this.servicess.quantity = i.quantity;
      this.servicess.serviceId = i.serviceId;
      console.log(this.servicess);
      this.requestAction.services.push(this.servicess)
    }
    this.requestAction.supplierId = Number(localStorage.getItem('profileId'));
    this.requestAction.eventId = this.events[0].eventId;
    this.requestAction.accept = data;
    console.log(this.requestAction);    
    
    this.spinner.show();
    this.endpoint.eventRequestAction(this.requestAction).subscribe((data)=>{
      console.log(data);
      this.response = data;
      this.spinner.hide();
      if( this.response.responseCode == '00'){
        this.notify.showInfo(this.response.responseMsg)
        this.router.navigate(['/dashboard'])
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
  open(addService: any) {
    this.modalService.open(addService);
    this.files = []
    this.addServices.pictureImages = []
    this.addServices = this.addServicesNew;
    console.log(this.addServices);
    
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
        this.notify.showSuccess(this.response.responseMsg)
        this.modalService.open(success, { centered: true });
        this.getSupplierServices();
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
      console.log(data);
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
    // this.ngxService.start();
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
        this.spinner.hide();
        this.notify.showError(error.message);
      }
    )
  }
  imageUrl: string = '';
  url: string[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    
  }

  profileImageUpload(success: any, data: any) {
    for (let i = 0; i < this.files.length; i++) {
      // const [file] = this.files[i];
      this.profileImgeFile = this.files[i];
      this.imageUpload(this.profileImgeFile);
    }
    this.serviceSuccess(success, data)
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }


}
