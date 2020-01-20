import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-portfolio',
  template: `
    <div class="w-32 flex-shrink-0 bg-gray-100 border-r">
      <nav class="flex flex-col h-full">
        <div>
          <a routerLink="skills" routerLinkActive="active"
             class="py-4 block">
            <div class="flex flex-col items-center justify-center ">
              <i class="fas fa-brain fa-lg text-gray-700"></i>
              <span class="mt-1 text-gray-600 font-semibold">Skills</span>
            </div>
          </a>
          <a href=""
             class="py-4 block">
            <div class="flex flex-col items-center justify-center ">
              <i class="fas fa-toolbox fa-lg text-gray-700"></i>
              <span class="mt-1 text-gray-600 font-semibold">Assets</span>
            </div>
          </a>
          <a href=""
             class="py-4 block">
            <div class="flex flex-col items-center justify-center ">
              <i class="fas fa-child fa-lg text-gray-700"></i>
              <span class="mt-1 text-gray-600 font-semibold">Activities</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
    <div class="flex-1 bg-gray-200">
      <h2 class="pl-4">Portfolio</h2>
      <div class="pl-4">
        <p>
          OK ON BOUGE LE MENU principal dans le header principal, c trop moche comme ça
        </p>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: [ 'portfolio.component.scss' ],
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
