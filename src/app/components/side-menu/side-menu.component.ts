import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconLink } from 'src/app/models/icon-link.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {

  public menuItems: IconLink[] = [
    {
      title: 'MAIN.HOME',
      icon: 'houseIcon',
      link: '/home',
    },
    {
      title: 'MAIN.PROJECTS',
      icon: 'rocketIcon',
      link: '/projects',
    },
    {
      title: 'MAIN.DEVELOPMENT',
      icon: 'biohazardIcon',
      link: '/dev',
    },
    {
      title: 'MAIN.ABOUT',
      icon: 'professionalIcon',
      link: '/about',
    },
    {
      title: 'MAIN.SETTINGS',
      icon: 'moonIcon',
      link: '/settings', // TODO: Dark mode functionality
    },
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'dragonIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/dragon-solid.svg')
    );
    this.iconRegistry.addSvgIcon(
      'showMoreIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/angle-double-right-solid.svg')
    );
    this.iconRegistry.addSvgIcon(
      'houseIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/home-solid.svg')
    );
    this.iconRegistry.addSvgIcon(
      'rocketIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/rocket-solid.svg')
    );
    this.iconRegistry.addSvgIcon(
      'biohazardIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/biohazard-solid.svg')
    );
    this.iconRegistry.addSvgIcon(
      'professionalIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/user-tie-solid.svg')
    );
    this.iconRegistry.addSvgIcon(
      'moonIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/moon-solid.svg')
    );
  }

  ngOnInit(): void {
  }

}
