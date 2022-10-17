import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
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


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  files: File[] = [];

  constructor(config: NgbRatingConfig,
    private interact:InteractionService,
    public router: Router,
    configModal: NgbModalConfig,
     private modalService: NgbModal) {
    config.max = 5;
    config.readonly = true;
    configModal.backdrop = 'static';
    configModal.keyboard = false;
   }

  collapsed=false
  screenWidth = 0
  authpage=''
  countries = COUNTRIES;
 
  ngOnInit(): void {
    this.interact.sharedscreenWidth.subscribe(message => {this.collapsed=message});
    this.interact.screenSize$.subscribe(message => {this.screenWidth=message})
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
