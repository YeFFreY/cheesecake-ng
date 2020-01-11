import { Component, OnInit } from '@angular/core';
import { DataResult, DataServiceError } from '@lib/services.utils';
import { ActivatedRoute } from '@angular/router';
import { Skill } from '../../../../domain/skill.model';

@Component({
  selector: 'chee-skill-show',
  template: `
    <div>
      <div *ngIf="error">
        <p>{{error.friendlyMessage}}</p>
      </div>
      <div *ngIf="skill">
        <h2>{{skill.name}}</h2>
        <p>{{skill.description}}</p>
      </div>
    </div>
  `,
  styles: []
})
export class SkillShowComponent implements OnInit {
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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ resolvedData }: { resolvedData: DataResult<Skill> }) => {
      resolvedData
        .ifLeft(this.onError)
        .ifRight(this.onDataRetrieved);
    });
  }

}
