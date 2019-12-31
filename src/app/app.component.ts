import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'cheesecake-ng';
}
