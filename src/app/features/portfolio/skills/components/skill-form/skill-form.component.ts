import { Component, OnInit } from '@angular/core';
import { SkillFormService } from './skill-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'chee-skill-form',
  template: `
    <form (ngSubmit)="submit()" novalidate [formGroup]="form">
      <label for="name">Name</label>
      <input type="text" name="name" formControlName="name">
      <label for="description">Description</label>
      <input type="text" name="description" formControlName="description">
      <button type="submit">Save</button>
    </form>
  `,
  styles: [],
  providers: [ SkillFormService ]
})
export class SkillFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formService: SkillFormService) {
    this.form = this.formService.form;
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.formService.to());
  }
}
