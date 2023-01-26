import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,
    private interact: InteractionService,
    private location:Location
    ) { }

    
    show:any
    userName: any ;
    userId:any;
  ngOnInit(): void {
    this.show = 'one';
    if(this.location.path() != "")this.show = 'two';    
    this.interact.sharednavbar$.subscribe(message => {this.show = message});
    this.interact.sharedUserName$.subscribe(message => {this.userName = message});
    this.interact.userId$.subscribe(message =>{this.userId = message})
    

  }
  collapsed = true;
  active = 1;
  
  rev=true;
  authpage=''

  isauthRouth(){
    return this.router.url == '/pricing';
  }

}
