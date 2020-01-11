import { Component, OnInit } from '@angular/core';
import { SkillData } from '../../../../domain/skill.model';
import { SkillsService } from '../services/skills.service';
import { DataServiceError } from '@lib/services.utils';

@Component({
  selector: 'chee-skill-create',
  template: `
    <div>
      <h3>Create a new skill</h3>
      <chee-skill-form (formSubmitted)="create($event)"></chee-skill-form>
    </div>
  `,
  styles: []
})
export class SkillCreateComponent implements OnInit {
  public error: DataServiceError | null = null;

  private onSuccess = () => {
    this.error = null;
  };

  private onError = (error: DataServiceError) => {
    this.error = error;
  };

  constructor(private skillsService: SkillsService) {
  }

  ngOnInit() {
  }

  create(skillData: SkillData) {
    this.skillsService.createSkill(skillData).subscribe(
      this.onSuccess,
      this.onError
    );
  }
}
