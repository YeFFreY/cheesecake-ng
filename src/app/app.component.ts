import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <header class="flex">
      <div class="w-32 flex-shrink-0 px-4 py-3 border-r bg-white z-10">
        <h1 class="text-lg">Cheesecake</h1>
      </div>
      <div class="w-64 flex-shrink-0 px-4 py-3 bg-white shadow-lg">
      </div>
      <div class="flex-1"></div>
      <div class="flex-shrink-0 px-4 py-3">
        <button class="flex items-center">
          <img
            class="h-6 w-6 rounded-full object-cover"
            src="https://placekitten.com/200/200" alt="you"/>
          <span class="ml-2 text-sm font-medium">Boubou Dou</span>
        </button>
      </div>
    </header>
    <div class="flex flex-1">
      <div class="w-32 flex-shrink-0 border-r pt-8 bg-white z-10">
        <chee-app-nav></chee-app-nav>
      </div>
      <router-outlet></router-outlet>
    </div>

  `,
  styles: [ '.active { background-color: #2d3748; }' ],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'h-screen flex flex-col'
  }
})
export class AppComponent {
}
