import { Injectable } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Observable } from 'rxjs';
import { Resource } from '../../../../../lib/hateoas';
import { SkillsLazyModule } from '../skills.lazy-module';

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
    return this.apiService.get<SkillOverview[]>('rel');
  }
}
