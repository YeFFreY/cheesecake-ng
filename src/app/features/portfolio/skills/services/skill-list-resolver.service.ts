import { Injectable } from '@angular/core';
import { SkillOverview, SkillsService } from './skills.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Either, Right } from 'purify-ts/Either';
import { DataServiceError } from '@lib/services.utils';
import { map } from 'rxjs/operators';
import { mapErrorToLeft } from '@lib/operators.rxjs';
import { SkillsLazyModule } from '../skills.lazy-module';

@Injectable({
  providedIn: SkillsLazyModule
})
export class SkillListResolverService implements Resolve<Either<DataServiceError, SkillOverview[]>> {

  constructor(private skillsService: SkillsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Either<DataServiceError, SkillOverview[]>> {
    return this.skillsService.fetchSkills().pipe(
      map(Right),
      mapErrorToLeft()
    );
  }
}
