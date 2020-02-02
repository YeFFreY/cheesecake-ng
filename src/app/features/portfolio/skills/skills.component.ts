import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-skills',
  template: `
    <h2 class="header">Skills</h2>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ './skills.component.scss' ]
})
export class SkillsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
