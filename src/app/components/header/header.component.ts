import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,
    private interact: InteractionService,
    ) { }

    show='two'
  ngOnInit(): void {
    
  }
  collapsed = true;
  active = 1;
  
  rev=true;
  authpage=''

  isauthRouth(){
    return this.router.url == '/pricing';
  }

}
