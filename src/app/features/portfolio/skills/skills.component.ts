import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-skills',
  template: `
    <div>
      skills works!
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class SkillsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
