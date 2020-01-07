import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillDetails } from '../../../../../domain/skill.model';

export interface SkillForm {
  name: string;
  description: string;
}

@Injectable()
export class SkillFormService {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [ '', Validators.required ],
      description: [ '' ]
    });
  }

  from(data: SkillForm) {
    this.form.patchValue(data);
  }

  to(): SkillDetails {
    return {
      name: this.formValue.name,
      description: this.formValue.description
    };
  }

  private get formValue(): SkillForm {
    return this.form.value;
  }
}
