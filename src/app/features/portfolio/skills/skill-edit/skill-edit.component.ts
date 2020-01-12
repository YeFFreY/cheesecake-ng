import { Component, OnInit } from '@angular/core';
import { Skill, SkillData } from '../../../../domain/skill.model';
import { DataResult, DataServiceError } from '@lib/services.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsService } from '../services/skills.service';

@Component({
  selector: 'chee-skill-edit',
  template: `
    <div>
      <h2>Edit the skill</h2>
      <div *ngIf="error">
        <p>{{error.friendlyMessage}}</p>
      </div>
      <div *ngIf="skill">
        <chee-skill-form [data]="skill" (formSubmitted)="update($event)"></chee-skill-form>
      </div>
    </div>
  `,
  styles: []
})
export class SkillEditComponent implements OnInit {
  public error: DataServiceError | null = null;
  public skill: Skill | null = null;

  private onDataRetrieved = (skill: Skill) => {
    this.skill = skill;
    this.error = null;
  };

  private onError = (error: DataServiceError) => {
    this.error = error;
    this.skill = null;
  };

  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ resolvedData }: { resolvedData: DataResult<Skill> }) => {
      console.log('got data: ', resolvedData);
      resolvedData
        .ifLeft(this.onError)
        .ifRight(this.onDataRetrieved);
    });
  }

  update(data: SkillData) {
    if (this.skill) {
      this.skillsService.updateSkill(this.skill, data).subscribe(
        _response => this.router.navigate([ '..' ], { relativeTo: this.route }),
        error => console.error('Error updating the mission, display them', error)
      );
    }
  }
}
