import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-portfolio',
  template: `
    <div class="sidebar">
      <h2 class="sidebar__header">Portfolio</h2>
      <nav>
        <a routerLink="skills" routerLinkActive="active">
          <div class="ring">
            <i class="fas fa-brain"></i>
            <span>Skills</span>
          </div>
        </a>
        <a href="">
          <div class="ring">
            <i class="fas fa-toolbox"></i>
            <span>Assets</span>
          </div>
        </a>
        <a href="">
          <div class="ring">
            <i class="fas fa-child"></i>
            <span>Activities</span>
          </div>
        </a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ 'portfolio.component.scss' ],
})
export class PortfolioComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
