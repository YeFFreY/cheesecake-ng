import { Injectable } from '@angular/core';
import { SkillFormModule } from './skill-form.module';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: SkillFormModule
})
export class SkillFormService {

  constructor(private fb: FormBuilder) {
  }
}
