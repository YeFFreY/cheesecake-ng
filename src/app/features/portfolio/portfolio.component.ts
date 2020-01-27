import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-portfolio',
  template: `
    <div class="w-16 md:w-64 flex-shrink-0 bg-white p-2 md:p-8 pt-4 shadow-r">
      <h2 class="text-xs md:text-2xl text-gray-800 font-semibold h-20 flex items-center">Portfolio</h2>
      <nav class="flex flex-col text-gray-600">
        <div>
          <a routerLink="skills" routerLinkActive="active"
             class="py-1 block">
            <div class="flex items-center py-2 md:-ml-2 rounded-full">
              <i class="fas fa-brain fa-lg pl-2 md:pr-4"></i>
              <span class="font-semibold hidden md:inline">Skills</span>
            </div>
          </a>
          <a href=""
             class="py-1 block">
            <div class="flex items-center py-2 md:-ml-2 rounded-full">
              <i class="fas fa-toolbox fa-lg pl-2 md:pr-4"></i>
              <span class="font-semibold hidden md:inline">Assets</span>
            </div>
          </a>
          <a href=""
             class="py-1 block">
            <div class="flex items-center py-2 md:-ml-2 rounded-full">
              <i class="fas fa-child fa-lg pl-2 md:pr-4"></i>
              <span class="font-semibold hidden md:inline">Activities</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
    <div class="flex-1 flex">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: [ 'portfolio.component.scss' ],
})
export class PortfolioComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
