import { TestBed } from '@angular/core/testing';

import { SkillResolverService } from './skill-resolver.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SkillsService } from './skills.service';
import * as faker from 'faker';
import { of, throwError } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { Skill } from '../../../../domain/skill.model';
import { DataServiceError, invalidResourceIdError } from '@lib/services.utils';

describe('SkillResolverService', () => {
  let route: ActivatedRouteSnapshot;
  let router: RouterStateSnapshot;
  let skillsServiceSpy: jasmine.SpyObj<SkillsService>;
  let service: SkillResolverService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SkillsService', [ 'fetchSkill' ]);

    TestBed.configureTestingModule({
      providers: [
        SkillResolverService,
        { provide: SkillsService, useValue: spy }
      ]
    });

    route = new ActivatedRouteSnapshot();
    router = { url: '/:id', root: route };
    service = TestBed.get(SkillResolverService);
    skillsServiceSpy = TestBed.get(SkillsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should returned the skill given a valid id', () => {
    route.params = {
      id: faker.random.number()
    };

    const expectedData: Skill = {
      id: route.params.id, name: faker.name.title(), description: faker.lorem.paragraph()
    };
    skillsServiceSpy.fetchSkill.and.returnValue(of(expectedData));

    service.resolve(route, router).subscribe(value => {
      expect(value).toEqual(Right(expectedData));
      expect(skillsServiceSpy.fetchSkill).toHaveBeenCalledWith(route.params.id);
    });
  });

  it('should returned a service error if invalid formatted id', () => {
    route.params = {
      id: faker.lorem.word()
    };

    service.resolve(route, router).subscribe(
      value => {
        expect(value).toEqual(Left(invalidResourceIdError(route.params.id)));
        expect(skillsServiceSpy.fetchSkill).toHaveBeenCalledTimes(0);
      }
    );
  });

  it('should returned a service error if resource not found', () => {
    route.params = {
      id: faker.random.number()
    };

    const expectedError = new DataServiceError(
      'NotFound',
      'Resource not found',
      `not found`);
    skillsServiceSpy.fetchSkill.and.returnValue(throwError(expectedError));

    service.resolve(route, router).subscribe(
      value => {
        expect(value).toEqual(Left(expectedError));
        expect(skillsServiceSpy.fetchSkill).toHaveBeenCalledTimes(1);
      }
    );
  });

});
