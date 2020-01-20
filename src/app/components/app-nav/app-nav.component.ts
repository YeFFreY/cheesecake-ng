import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-app-nav',
  template: `
    <nav class="flex">
      <a routerLink="portfolio" routerLinkActive="active"
         class="inline-block px-4 py-2 text-sm font-medium text-white rounded">
        <i class="fas fa-book"></i>
        <span class="ml-2">Portfolio</span>
      </a>
      <a href=""
         class="inline-block px-4 py-2 text-sm font-medium text-white rounded">
        <i class="far fa-calendar-alt"></i>
        <span class="ml-2">Agenda</span>
      </a>
    </nav>
  `,
  styles: [ '.active { background-color: #2d3748; }' ],
})
export class AppNavComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
