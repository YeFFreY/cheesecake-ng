import { Component } from '@angular/core';

@Component({
  selector: 'chee-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div>
      <div>
        <chee-app-nav></chee-app-nav>
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
