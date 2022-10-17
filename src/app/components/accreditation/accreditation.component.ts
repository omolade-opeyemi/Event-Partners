import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';

import {FormBuilder, Validators} from '@angular/forms';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  dots:string;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
    dots:'more_vert'
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
    dots:'more_vert'
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
    dots:'more_vert'
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
    dots:'more_vert'
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
  collapsed=false
  screenWidth = 0
  authpage=''
  page=''
  countries = COUNTRIES;

  constructor(private interact:InteractionService, private _formBuilder: FormBuilder,
    public router: Router,) { 
      
    }

    ngOnInit(): void {
      this.page='introMsg';
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

    acrreditation(){
      this.page = 'stepper'
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
