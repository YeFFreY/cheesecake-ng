import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-app-nav',
  template: `
    <nav class="flex flex-col">
      <a routerLink="portfolio" routerLinkActive="active"
         class="flex justify-center items-center h-24 text-2xl font-medium text-gray-600 rounded">
        <div class="nav-focus rounded-full flex justify-center items-center h-16 w-16">
          <i class="fas fa-book"></i>
        </div>
      </a>
      <a href=""
         class="flex justify-center items-center h-24 text-2xl font-medium text-gray-600 rounded">
        <i class="far fa-calendar-alt"></i>
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
