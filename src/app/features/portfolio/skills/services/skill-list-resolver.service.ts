import { Injectable } from '@angular/core';
import { SkillsModule } from '../skills.module';
import { SkillOverview, SkillsService } from './skills.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: SkillsModule
})
export class SkillListResolverService implements Resolve<SkillOverview[]> {

  constructor(private skillsService: SkillsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SkillOverview[]> {
    return this.skillsService.fetchSkills();
  }
}
