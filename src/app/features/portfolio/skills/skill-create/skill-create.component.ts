import { Component, OnInit } from '@angular/core';
import { SkillFormService } from '../components/skill-form/skill-form.service';

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

  constructor(private formService: SkillFormService) {
  }

  ngOnInit() {
  }

}
