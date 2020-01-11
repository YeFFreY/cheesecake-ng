import { Injectable } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Observable } from 'rxjs';
import { Resource } from '@lib/hateoas';
import { SkillsLazyModule } from '../skills.lazy-module';
import { Skill, SkillData } from '../../../../domain/skill.model';

export interface SkillOverview extends Resource {
  name: string;
}

@Injectable({
  providedIn: SkillsLazyModule
})
export class SkillsService {

  constructor(private apiService: ApiService) {
  }

  public fetchSkills(): Observable<SkillOverview[]> {
    return this.apiService.get<SkillOverview[]>('skills::index');
  }

  public createSkill(data: SkillData): Observable<void> {
    return this.apiService.post('skills::store', data);
  }

  public fetchSkill(id: number) {
    return this.apiService.get<Skill>('skills::show', { skill: id });
  }
}
