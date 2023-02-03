import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FileStorageService } from 'src/app/services/file-storage.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DeleteService } from 'src/app/models/services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'src/app/models/accreditation';
import { DialogAnimationExampleDialogComponent } from 'src/app/dialog-animation-example-dialog/dialog-animation-example-dialog.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Accreditation, BasicInfo, PaymentDetails, ProofOfExistence, SupplierLocation, SupplierService, } from 'src/app/models/accreditation';
import { environment } from 'src/environments/environment';
import { ThisReceiver } from '@angular/compiler';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  dots: string;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
    dots: 'more_vert'
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
    dots: 'more_vert'
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
    dots: 'more_vert'
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
    dots: 'more_vert'
  }
];


@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.scss'],

})
export class AccreditationComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  files: File[] = [];
  collapsed = false
  screenWidth = 0
  authpage = ''
  page = '';
  response: any;
  states: any = [];
  lga: any = [];
  statelga = '';
  reload: any;
  userName: any;

  paymentStatus = '';
  payment = new Payment('', '', '', '', '', 0, '', '');
  paymentMessage: any;
  key = environment['paystackKey'];

  paymentInit() {
    console.log('Payment initialized');
    // this.payment.amount = this.bookingPrice;
  }

  paymentDone(ref: { message: string, reference: string, status: string }) {
    this.paymentStatus = ref.status;
    this.paymentDetails.transactionRef = ref.reference
    if (ref.status == 'success') {
      // this.addNewAsset(ref.reference, 'paystack');
      this.paymentDetails.paymentStatus = ref.status;
      this.accreditationRequest()
    }
    else{
      this.notifyService.showError('Error in making payment')
    }
    

  }

  paymentCancel() {
    console.log('payment failed');
    this.page = 'payment'
  }

  addBasicInfo = new BasicInfo('', '', '', '', '', '');
  addSupplierLocation = new SupplierLocation('', '', '');
  // addSupplierService = new SupplierService
  paymentDetails = new PaymentDetails('50000','','','');
  deleteServices = new DeleteService(0, [])
  supplierService = new SupplierService('', 0);
  addSupplierServices: SupplierService[] = [];
  addProofOfExistence = new ProofOfExistence('', '', []);
  proofOfExistences : any[] = [];
  // addPaymentDetails = new PaymentDetails('', '', '', '')
  addAccreditation = new Accreditation(
    0,
    this.proofOfExistences,
    this.paymentDetails)

  countries = COUNTRIES;

  constructor(private interact: InteractionService,
    private _formBuilder: FormBuilder,
    public router: Router,
    private endpoint: EndpointsService,
    private notifyService: NotificationService,
    private fileStorageService: FileStorageService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    config: NgbModalConfig, private modalService: NgbModal,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  testLocationInfo() {
    console.log(this.proofOfExistences);

  }
  reference = ''
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
      this.addAccreditation.profileId = Number(localStorage.getItem('profileId'));
      this.getDetailsForAccreditationRequest();
      this.interact.getUserName(String(localStorage.getItem('name')));
      this.interact.getUserId(String(localStorage.getItem('profileId')))
      this.userName = localStorage.getItem('name')

      this.page = 'introMsg';
      this.interact.sharedscreenWidth.subscribe(message => { this.collapsed = message });
      this.interact.screenSize$.subscribe(message => { this.screenWidth = message });
      this.interact.service$.subscribe(message => {
        this.reload = message;
        // if( this.reload == 'yes'){
        //   this.getSupplierServices();
        // }
      })
    }
    else {
      this.router.navigate(['/']);
    }
  }

  openDialog(i: any): void {
    this.dialog.open(DialogAnimationExampleDialogComponent, {
      width: '400px',
      data: i,
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  supplierData: any[] = [];
  accreditationData: any;
  getDetailsForAccreditationRequest() {
    this.spinner.show();
    this.endpoint.getDetailsForAccreditationRequest(Number(localStorage.getItem('profileId'))).subscribe((data) => {
      this.response = data;
      this.spinner.hide();
      if (this.response.responseCode == '00') {
        // basic info
        this.accreditationData = this.response.responseData
        this.addBasicInfo.firstName = this.accreditationData.basicInfo.firstName
        this.addBasicInfo.lastName = this.accreditationData.basicInfo.lastName
        this.addBasicInfo.dateOfBirth = this.accreditationData.basicInfo.dateOfBirth.split('T')[0]
        this.addBasicInfo.gender = this.accreditationData.basicInfo.gender
        this.addBasicInfo.phoneNumber = this.accreditationData.basicInfo.phoneNumber
        this.addBasicInfo.email = this.accreditationData.basicInfo.email
        // location
        this.addSupplierLocation.state = this.accreditationData.supplierLocation.state
        this.addSupplierLocation.lga = this.accreditationData.supplierLocation.lga
        this.addSupplierLocation.address = this.accreditationData.supplierLocation.address
        // services
        this.supplierData = this.accreditationData.supplierServices
      }
      else {
        this.notifyService.showError(this.response.responseMsg)
      }
    }, (error) => {
      this.notifyService.showError(error.message);
    })
  }

  supplierResponse: any;
  // getSupplierServices(){
  //   this.spinner.show()
  //   this.endpoint.getSupplierService(Number(localStorage.getItem('profileId'))).subscribe((data)=> {
  //     this.supplierResponse = data;
  //     console.warn(this.supplierResponse);
  //     this.spinner.hide()
  //     if( this.supplierResponse.responseCode == '00'){
  //       this.supplerData = this.supplierResponse.responseData;
  //       for (let i = 0; i < this.supplerData.length; i++){
  //         this.supplierService.id = this.supplerData[i].serviceId;
  //         this.supplierService.name = this.supplerData[i].serviceType;
  //         this.addSupplierServices.push(this.supplierService);
  //       }
  //     }
  //     else{
  //       this.notifyService.showError(this.supplierResponse.responseMsg)
  //     }
  //   }, (error) => {      
  //     this.notifyService.showError(error.message);
  //   })
  // }
  // getStates(){
  //   this.spinner.show();
  //   this.endpoint.getStates().subscribe((data)=>{
  //     this.response = data;
  //     this.spinner.hide()
  //     if (this.response.responseCode == '00'){
  //       this.states=this.response.responseData;
  //     }
  //     else{
  //       this.notifyService.showError(this.response.responseMsg)
  //     }
  //   },(error) => {
  //     this.notifyService.showError(error.error.responseMsg);
  //   })
  // }

  // getlga(value: any) {
  //   this.addSupplierLocation.state = value.split(',')[1];
  //   this.endpoint.getLga(value.split(',')[0]).subscribe(data => {
  //     this.response = data;  
  //       this.lga= this.response.responseData })
  // }

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

  acrreditation() {
    this.page = 'stepper'
  }

  deleteSupplierServices() {
    this.endpoint.deleteSupplierService(this.deleteServices).subscribe((data) => {
      console.log(data);

    })
  }

  accreditationRequest() {
    this.spinner.show();
    this.addAccreditation.profileId = Number(localStorage.getItem('profileId'))
    this.endpoint.accreditationRequest(this.addAccreditation).subscribe((data) => {
      console.log(data);
      this.response = data;
      this.spinner.hide();
      if (this.response.responseCode == '00') {
        this.notifyService.showSuccess('Accreditation successful')
        this.page = 'introMsg';
      }
      else {
        this.notifyService.showError(this.response.responseMsg)
      }
    }, (error) => {
      this.spinner.hide();
      this.notifyService.showError(error.error.responseMsg);
    })
  }
  fileUrl: string = '';
  file: string[] = [];
  imageUpload(selectedfile: any) {
    this.spinner.show();
    this.file = []
    this.fileStorageService.UploadFileFromDataUrl(selectedfile);
    this.fileStorageService.onUploadFinished.subscribe(
      (resp: any) => {
        this.spinner.hide();
        if (resp.responseCode != "00") {
          this.notifyService.showError('System error, A system error has occured');
        }
        else {
          this.fileUrl = resp.responseData;
          this.file.push(this.fileUrl);
          this.addProofOfExistence.documentFiles = this.file;          
        }
      }, (error) => {
        this.spinner.hide();
        this.notifyService.showError(error.error.responseMsg);
      }
    )
  }
  profileImgeFile: any;
  onSelect(event: { addedFiles: any; }) {
    this.files.push(...event.addedFiles);    
  }

  profileImageUpload(data:any) {
    var profileImgeFile:any
    for (let i = 0; i < this.files.length; i++) {
      profileImgeFile = this.files[i];
      this.imageUpload(profileImgeFile);
    }
    var proof:ProofOfExistence = new ProofOfExistence(data.caption, data.description.substring(0, 20),this.addProofOfExistence.documentFiles)
    this.proofOfExistences.push(proof);
    this.clearVerificationForm()
  }

  clearVerificationForm(){
    this.addProofOfExistence.documentCaption = ''
    this.addProofOfExistence.documentDescription = ''
    this.addProofOfExistence.documentFiles = []
    this.files = []
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);

  }

}


