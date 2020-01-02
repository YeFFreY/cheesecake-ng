import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-portfolio',
  template: `
    <div>
      <h2>Portfolio</h2>
      <div>
        <a routerLink="skills" routerLinkActive="active">skills</a>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class PortfolioComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
