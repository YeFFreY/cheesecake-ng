import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-app-nav',
  template: `
    <nav>
      <a routerLink="portfolio" routerLinkActive="active">
        <div>
          <i class="fas fa-book"></i>
        </div>
      </a>
      <a href="">
        <div>
          <i class="far fa-calendar-alt"></i>
        </div>
      </a>
    </nav>
  `,
  styleUrls: [ './app-nav.component.scss' ]
})
export class AppNavComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
