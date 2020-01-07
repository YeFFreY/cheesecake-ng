import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chee-skill-create',
  template: `
    <div>
      <h3>Create a new skill</h3>
      <chee-skill-form></chee-skill-form>
    </div>
  `,
  styles: []
})
export class SkillCreateComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
