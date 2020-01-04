import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Either } from 'purify-ts/Either';
import { DataServiceError } from '../../../../../lib/services.utils';
import { SkillOverview } from '../services/skills.service';

@Component({
  selector: 'chee-skill-list',
  template: `
    <div>
      <p *ngIf="error">error: {{error?.friendlyMessage}}</p>
      <p *ngIf="skills">skills: {{skills}}</p>
    </div>
  `,
  styles: []
})
export class SkillListComponent implements OnInit {
  public error: DataServiceError | null = null;
  public skills: SkillOverview[] | null = null;

  private onDataRetrieved = (skills: SkillOverview[]) => {
    this.skills = skills;
    this.error = null;
  };

  private onError = (error: DataServiceError) => {
    this.error = error;
    this.skills = null;
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ resolvedData }: { resolvedData: Either<DataServiceError, SkillOverview[]> }) => {
      resolvedData
        .ifLeft(this.onError)
        .ifRight(this.onDataRetrieved);
    });
  }

}
