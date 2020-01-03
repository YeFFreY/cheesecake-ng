import { Injectable } from '@angular/core';
import { SkillsModule } from '../skills.module';
import { ApiService } from '../../../../services/api.service';
import { Observable } from 'rxjs';
import { Resource } from '../../../../../lib/hateoas';

export interface SkillOverview extends Resource {
  name: string;
}

@Injectable({
  providedIn: SkillsModule
})
export class SkillsService {

  constructor(private apiService: ApiService) {
    console.log('Instantiated SkillsService');
  }

  public fetchSkills(): Observable<SkillOverview[]> {
    return this.apiService.get<SkillOverview[]>('rel');
  }
}
