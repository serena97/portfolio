import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  active_link: string = 'work'

  constructor() {
  }
  // https://stackoverflow.com/questions/11078509/how-to-increase-the-clickable-area-of-a-a-tag-button
  ngOnInit(): void {
  }

  onClick(name) {
    this.active_link = name
  }

}
