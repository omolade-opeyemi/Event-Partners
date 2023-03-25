import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoicing, InvoiceDetails } from 'src/app/models/invoicing';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';



interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  event:string,
  status:string
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
    event:'#54646',
    status:'Done'
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
    event:'#54646',
    status:'Pending'
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
    event:'#54646',
    status:'Done'
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
    event:'#54646',
    status:'Pending'
  }
];
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private interact:InteractionService,
    public router: Router,
    private endpoint: EndpointsService,
    private modalService: NgbModal,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,

    ) { }

    invoicing = new Invoicing('','','','','',true,0,[]);
    invoicingDetail = new InvoiceDetails(0,0)
  collapsed=false
  screenWidth = 0
  authpage=''
  countries = COUNTRIES;
  response: any

  ngOnInit(): void {
    this.interact.sharedscreenWidth.subscribe(message => {this.collapsed=message});
    this.interact.screenSize$.subscribe(message => {this.screenWidth=message});
    this.getSupplierInvoices();
  }

  sendSupplierInvoice(data:string){
    this.spinner.show();
    this.endpoint.sendSupplierInvoice(data).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if(this.response.responseCode == '00'){
        this.getSupplierInvoices();
        this.notify.showSuccess(this.response.responseMsg);
      }else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {      
      this.notify.showError(error.message);
            this.spinner.hide();
    })
  }

  deleteSupplierService(data:string){
    this.spinner.show();
    this.endpoint.deleteSupplierInvoice(data).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if(this.response.responseCode == '00'){
        this.getSupplierInvoices();
        this.notify.showSuccess(this.response.responseMsg)
      }else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {      
      this.notify.showError(error.message);
            this.spinner.hide();
    })
  }


  invoiceDetail:any;
  getSupplierInvoiceDetails(review:any, data:any){
    this.spinner.show();
    const profileId = Number(localStorage.getItem('profileId'))
    const invoiceId = data
    this.endpoint.getSupplierInvoiceDetails(profileId, invoiceId).subscribe((data)=> {
      this.response = data;
      this.spinner.hide();
      if( this.response.responseCode == '00'){
        this.invoiceDetail = this.response.responseData;
        this.modalService.open(review, { size: 'xl' });
      }
      else{
        this.notify.showError(this.response.responseMsg)
      }
    },(error) => {      
      this.notify.showError(error.message);
            this.spinner.hide();
    })
  }
  detailInvoice(content:any,data:any) {
		this.modalService.open(content, { size: 'xl' });
	}
  supplierInvoices:any;
  getSupplierInvoices(){
    this.spinner.show();
    this.endpoint.getSupplierInvoices(Number(localStorage.getItem('profileId'))).subscribe((data)=>{
      this.response = data;
      this.spinner.hide();
      if(this.response.responseCode == '00'){
        this.supplierInvoices = this.response.responseData;
      }
      else{
        this.notify.showError(this.response.responseMsg)
      }

    },(error) => {      
      this.notify.showError(error.message);
            this.spinner.hide();
    })
    
  }
  isauthRouth(){
    this.authpage='/auth';
    return this.router.url === '/auth';
  }

  getBodyClass(): string {
    let styleClass= '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  openLg(content: any) {
    this.spinner.show()
    this.endpoint.getSupplierInvoiceNumber(Number(localStorage.getItem('profileId'))).subscribe(
      (data)=>{
        this.response = data;
        this.spinner.hide()
        if( this.response.responseCode == '00'){
          this.getSupplierServices();
          this.invoicing.inovieceNumber = this.response.responseData;
          this.modalService.open(content, { size: 'lg' });
        }
        else{
          this.notify.showError(this.response.responseMsg)
        }
    },(error) => {      
      this.notify.showError(error.message);
            this.spinner.hide();

    })
  }

  serviceRate:any
  supplierResponse: any;
  supplerData: any;
  getSupplierServices() {
    this.endpoint.getSupplierService(Number(localStorage.getItem('profileId'))).subscribe((data) => {
      this.supplierResponse = data;
      if (this.supplierResponse.responseCode == '00') {
        this.supplerData = this.supplierResponse.responseData
      }
      else {
        this.notify.showError(this.supplierResponse.responseMsg)
      }
    }, (error) => {
      this.notify.showError(error.message);
    })
  }

  getRate(value: any) {
    this.invoicingDetail.serviceId = value.split(',')[0];
    this.invoicingDetail.rate = value.split(',')[1];
  }

  createSupplierInvoice(data:any){
    this.invoicing.isSent = data;
    this.invoicing.serviceDesriptionDetails . push(this.invoicingDetail);
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
}