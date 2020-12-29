import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {
  active_link: string = 'work';
  shouldOpenMobileMenu = false;


  onClick(name) {
    this.active_link = name
  }

  openMobileMenu(event) {
    if(event) {
      this.shouldOpenMobileMenu = !this.shouldOpenMobileMenu;
    }
  }
}
