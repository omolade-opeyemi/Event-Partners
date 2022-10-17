import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { navbarData, navbarLow } from 'src/app/models/side-nav';
import { InteractionService } from 'src/app/services/interaction.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  navDataLow = navbarLow;

  constructor(private interaction: InteractionService) { }
  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.interaction.getscreenWidth(this.collapsed)
    this.interaction.getscreenSize(this.screenWidth)
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.interaction.getscreenWidth(this.collapsed)
    this.interaction.getscreenSize(this.screenWidth)
      }

  closeSidenav(): void {
    this.collapsed = false;
    this.interaction.getscreenWidth(this.collapsed);
    this.interaction.getscreenSize(this.screenWidth);
  }

}
