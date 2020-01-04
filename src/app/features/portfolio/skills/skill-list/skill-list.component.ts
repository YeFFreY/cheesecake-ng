import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Either } from 'purify-ts/Either';
import { DataServiceError } from '../../../../../lib/services.utils';
import { SkillOverview } from '../services/skills.service';

@Component({
  selector: 'chee-skill-list',
  template: `
    <div>
      <p>error: {{error?.friendlyMessage}}</p>
      <p>skills: {{skills}}</p>
    </div>
  `,
  styles: []
})
export class SkillListComponent implements OnInit {
  public error: DataServiceError | null = null;
  public skills: SkillOverview[] | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ resolvedData }: { resolvedData: Either<DataServiceError, SkillOverview[]> }) => {
      resolvedData
        .ifLeft(error => this.error = error)
        .ifRight(skills => this.skills = skills);
    });
  }

}
