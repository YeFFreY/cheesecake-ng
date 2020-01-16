import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-app-nav',
  template: `
    <nav class="flex flex-col h-full ">
      <a routerLink="portfolio" routerLinkActive="active"
         class="flex flex-col items-center px-2 py-4">
        <i class="fas fa-book fa-2x fa-fw text-gray-700 mb-1"></i>
        <span class="text-sm text-gray-600">Portfolio</span>
      </a>
      <a href="" class="flex flex-col items-center px-2 py-4">
        <i class="far fa-calendar-alt fa-2x fa-fw text-gray-700 mb-1"></i>
        <span class="text-sm text-gray-600">Agenda</span>
      </a>
    </nav>
  `,
  styles: [ '.active { background-color: #edf2f7; }' ],
})
export class AppNavComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
