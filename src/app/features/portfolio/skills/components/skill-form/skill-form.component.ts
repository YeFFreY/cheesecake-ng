import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SkillFormService } from './skill-form.service';
import { FormGroup } from '@angular/forms';
import { SkillData } from '../../../../../domain/skill.model';

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
export class SkillFormComponent implements OnChanges {
  form: FormGroup;

  @Input() data: SkillData | null = null;
  @Output() formSubmitted = new EventEmitter<SkillData>();

  constructor(private formService: SkillFormService) {
    this.form = this.formService.form;
  }

  submit() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.formService.to());
    } else {
      console.log('[Chee] invalid data to create skill, ignoring user submission');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.formService.from(changes.data.currentValue);
    }
  }
}
