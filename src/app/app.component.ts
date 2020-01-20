import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <header class="flex">
      <div class="w-32 flex-shrink-0 px-4 py-3 bg-gray-800">
        <h1 class="text-white text-lg">Cheesecake</h1>
      </div>
      <chee-app-nav class="flex-1 flex items-center px-6 bg-gray-700"></chee-app-nav>
      <div class="flex-shrink-0 px-4 py-3 bg-gray-700">
        <button class="flex items-center">
          <span class="text-sm font-medium text-white">Boubou Dou</span>
          <img
            class="ml-4 h-8 w-8 rounded-full object-cover"
            src="https://placekitten.com/200/200" alt="you"/>
        </button>
      </div>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [ '.active { background-color: #2d3748; }' ],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'h-screen flex flex-col'
  }
})
export class AppComponent {
}
