import { Injectable } from '@angular/core';
import { SkillsLazyModule } from '../skills.lazy-module';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Skill } from '../../../../domain/skill.model';
import { DataResult, invalidResourceIdError } from '@lib/services.utils';
import { Observable, of } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { map } from 'rxjs/operators';
import { mapErrorToLeft } from '@lib/operators.rxjs';
import { SkillsService } from './skills.service';

@Injectable({
  providedIn: SkillsLazyModule
})
export class SkillResolverService implements Resolve<DataResult<Skill>> {

  constructor(private service: SkillsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataResult<Skill>> {
    const id = route.paramMap.get('id');
    if (!id || isNaN(+id)) {
      return of(Left(invalidResourceIdError(id)));
    }
    return this.service.fetchSkill(+id).pipe(
      map(Right),
      mapErrorToLeft()
    );
  }
}
