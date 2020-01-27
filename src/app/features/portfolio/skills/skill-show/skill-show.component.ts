import { Component, OnInit } from '@angular/core';
import { DataResult, DataServiceError } from '@lib/services.utils';
import { ActivatedRoute } from '@angular/router';
import { Skill } from '../../../../domain/skill.model';

@Component({
  selector: 'chee-skill-show',
  template: `
    <div *ngIf="error">
      <p>{{error.friendlyMessage}}</p>
    </div>
    <div *ngIf="skill" class=" flex-1 bg-white rounded p-4 shadow-sm">
      <div class="flex mb-4">
        <h3 class="flex-1 text-xl text-gray-800 border-b pb-4">{{skill.name}}</h3>

        <a class="px-4 border rounded-full flex justify-center items-center
          h-8 text-gray-600 text-sm font-medium hover:bg-white hover:shadow-md hover:border-none"
           *cheeIfResourceHasRel="{ resource: skill, rel: 'update'}" [routerLink]="['edit']"
           routerLinkActive="active">
          <i class="fas fa-plus pr-2"></i>
          <span>Edit</span>
        </a>

      </div>
      <p class="text-gray-600">{{skill.description}}</p>
    </div>
  `,
  styles: [],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'flex flex-1'
  }

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
