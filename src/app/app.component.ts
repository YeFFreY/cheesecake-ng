import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <header class="header">
      <div class="header__logo">
        <h1>Cheesecake</h1>
      </div>
      <div class="header__search">
        <i class="fas fa-search"></i>
        <span>Search...</span>
      </div>
      <div class="header__user">
        <button class="btn">
          <img
            src="https://placekitten.com/200/200" alt="you"/>
          <span>Boubou Dou</span>
        </button>
      </div>
    </header>
    <div class="main">
      <chee-app-nav></chee-app-nav>
      <router-outlet></router-outlet>
    </div>

  `,
  styles: [ '.active { background-color: #2d3748; }' ],
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
}
