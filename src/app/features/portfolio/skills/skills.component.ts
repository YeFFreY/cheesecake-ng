import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-skills',
  template: `
    <div class="pl-4 md:p-8 pt-4 flex-1 flex flex-col">
      <h2 class="text-2xl text-gray-800 font-semibold h-20 flex items-center">Skills</h2>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'flex-1 flex'
  }
})
export class SkillsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
