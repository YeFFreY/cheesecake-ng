import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-app-nav',
  template: `
    <nav>
      <h2></h2>
      <a routerLink="portfolio" routerLinkActive="active">portfolio</a>
    </nav>
  `,
  styles: []
})
export class AppNavComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
