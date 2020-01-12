import { Component, OnInit } from '@angular/core';
import { Skill, SkillData } from '../../../../domain/skill.model';
import { SkillsService } from '../services/skills.service';
import { DataServiceError } from '@lib/services.utils';
import { ActivatedRoute, Router } from '@angular/router';

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

  private onSubmitSuccess = (skill: Skill) => {
    this.error = null;
    this.router.navigate([ `../${ skill.id }` ], { relativeTo: this.route });
  };

  private onSubmitError = (error: DataServiceError) => {
    this.error = error;
  };

  constructor(private skillsService: SkillsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  create(skillData: SkillData) {
    this.skillsService.createSkill(skillData).subscribe(
      this.onSubmitSuccess,
      this.onSubmitError
    );
  }
}
