import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataResult, DataServiceError } from '@lib/services.utils';
import { SkillOverview } from '../services/skills.service';

@Component({
  selector: 'chee-skill-list',
  template: `
    <div>
      <div class="flex mb-8">
        <a class="px-4 border rounded-full flex justify-center items-center
         h-8 text-gray-600 text-sm font-medium hover:bg-white hover:shadow-md hover:border-none"
           *cheeIfHasRel="'skills::store'"
           routerLink="create"
           routerLinkActive="active">
          <i class="fas fa-plus pr-2"></i>
          <span>Create</span>
        </a>
      </div>
      <p *ngIf="error">error: {{error?.friendlyMessage}}</p>
      <div *ngIf="skills">
        <ng-container *ngFor="let skill of skills">
          <a class="skill-item bg-white rounded mb-2 p-4 block shadow-sm hover:shadow"
             [routerLink]="[skill.id]">
            <h4 class="font-semibold text-gray-800 mb-2">{{skill.name}}</h4>
            <p class="text-gray-600 text-sm">{{skill.description}}</p>
          </a>
        </ng-container>
      </div>
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
    this.route.data.subscribe(({ resolvedData }: { resolvedData: DataResult<SkillOverview[]> }) => {
      resolvedData
        .ifLeft(this.onError)
        .ifRight(this.onDataRetrieved);
    });
  }

}
