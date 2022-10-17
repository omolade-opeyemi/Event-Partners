import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal) { }
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

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }


}
