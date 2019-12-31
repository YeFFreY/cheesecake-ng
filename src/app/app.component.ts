import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="text-center">
      <h1 class="text-2xl">
        Welcome to {{title}}!
      </h1>
      <p class="text-blue-500">{{ title }} app is running!</p>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'cheesecake-ng';
}
