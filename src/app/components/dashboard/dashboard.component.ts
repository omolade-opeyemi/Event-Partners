import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  date:string;
  icon:String
}
interface Requests {
  creator: string;
  flag: string;
  name: string;
  service: string;
  amount: number;
  date:string;
  icon:String
}
const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 5,
    date:'Sept 26, 2022',
    icon:'more_horz'
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
    date:'Sept 26, 2022',
    icon:'more_horz'
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
    date:'Sept 26, 2022',
    icon:'more_horz'
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
    date:'Sept 26, 2022',
    icon:'more_horz'
  }
];

const REQUESTS: Requests[] = [
  {
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount:2022,
    date:'Sept 26, 2022',
    icon:'more_horiz'
  },{
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount:2022,
    date:'Sept 26, 2022',
    icon:'more_horiz'
  },{
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount:2022,
    date:'Sept 26, 2022',
    icon:'more_horiz'
  },{
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount:2022,
    date:'Sept 26, 2022',
    icon:'more_horiz'
  },{
    creator: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    name: 'Burna',
    service: 'Disk',
    amount:2022,
    date:'Sept 26, 2022',
    icon:'more_horiz'
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

  constructor(config: NgbRatingConfig,
    private interact:InteractionService,
    public router: Router,
    configModal: NgbModalConfig,
    private offcanvasService: NgbOffcanvas,
     private modalService: NgbModal) {
    config.max = 5;
    config.readonly = true;
    configModal.backdrop = 'static';
    configModal.keyboard = false;
   }

   closeResult: string | undefined;
  collapsed=false
  screenWidth = 0
  authpage=''
  countries = COUNTRIES;
  requests = REQUESTS;
  page='';
  request=''
  requestHead=''
  sidebar=false;
  showFiller = true;
 
  ngOnInit(): void {
    this.page='one'
    this.interact.sharedscreenWidth.subscribe(message => {this.collapsed=message});
    this.interact.screenSize$.subscribe(message => {this.screenWidth=message})
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end', backdrop: false });
  }
  dashBoard(){
    this.page= 'one'
  }
  pendingReq(){
    this.page= 'requests'
    this.requestHead='pending'
    this.request = 'pending'
  }
  requestAtten(){
    this.page= 'requests'
    this.requestHead='attended'
    this.request = 'attended'
  }
  pendingRequest(){
    this.requestHead='pending'
    this.request = 'pending'
  }
  requestAttended(){
    this.requestHead='attended'
    this.request = 'attended'
  }
  toggleSideBar(){
    this.sidebar = !this.sidebar;
    if( this.sidebar == true){
      // this.openEnd(content)
    }
    else{
      // this.offcanvasService.dismiss(content)
    }
    
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
  open(addService:any) {
    this.modalService.open(addService);
  }
  addService(){
    this.modalService.dismissAll()
  }
  serviceSuccess(success: any) {
    this.addService();
    this.modalService.open(success, { centered: true });
  }
  
  onSelect(event: { addedFiles: any; }) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event: File) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
}
