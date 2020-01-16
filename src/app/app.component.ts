import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <div class="w-32 flex-shrink-0 bg-gray-100">
      <chee-app-nav></chee-app-nav>
    </div>
    <main class="flex-1 bg-gray-200 flex">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'flex flex-1'
  }
})
export class AppComponent {
}
