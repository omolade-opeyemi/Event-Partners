import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AccreditationComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  collapsed=false
  screenWidth = 0
  authpage=''
  page=''
  constructor(private interact:InteractionService,private _formBuilder: FormBuilder,
    public router: Router,) { }

    ngOnInit(): void {
      this.page='stepper';
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

    

}
