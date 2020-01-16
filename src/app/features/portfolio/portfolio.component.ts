import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-portfolio',
  template: `
    <div class="w-32 flex-shrink-0 bg-gray-200 border-r border-l">
      <nav class="flex flex-col h-full p-2">
        <a routerLink="skills" routerLinkActive="active"
           class="flex justify-center py-2 rounded">
          <span class="text-sm uppercase text-gray-600">Skills</span>
        </a>
        <a href="" class="flex justify-center py-2 rounded">
          <span class="text-sm uppercase text-gray-600">Assets</span>
        </a>
        <a href="" class="flex justify-center py-2 rounded">
          <span class="text-sm uppercase text-gray-600">Activities</span>
        </a>
      </nav>
    </div>
    <div class="flex-1">
      <h2 class="pl-4">Portfolio</h2>
      <div class="pl-4">
        <p>
          OK ON BOUGE LE MENU principal dans le header principal, c trop moche comme ça
        </p>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [ '.active { background-color: #4a5568; }' ],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'flex-1 flex'
  }
})
export class PortfolioComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
