import { TestBed } from '@angular/core/testing';

import { SkillListResolverService } from './skill-list-resolver.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SkillOverview, SkillsService } from './skills.service';
import * as faker from 'faker';
import { of } from 'rxjs';
import { Right } from 'purify-ts/Either';

describe('SkillListResolverService', () => {
  const route = new ActivatedRouteSnapshot();
  const router = { url: '', root: route };
  let skillsServiceSpy: jasmine.SpyObj<SkillsService>;
  let skillListResolverService: SkillListResolverService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SkillsService', [ 'fetchSkills' ]);

    TestBed.configureTestingModule({
      providers: [
        SkillListResolverService,
        { provide: SkillsService, useValue: spy }
      ]
    });

    skillListResolverService = TestBed.get(SkillListResolverService);
    skillsServiceSpy = TestBed.get(SkillsService);
  });

  it('should be created', () => {
    expect(skillListResolverService).toBeTruthy();
  });

  it('should returned the list of skills given by the skillsService', () => {
    const expectedData: SkillOverview[] = [
      { id: faker.random.number(), name: faker.name.title() },
      { id: faker.random.number(), name: faker.name.title() },
    ];
    skillsServiceSpy.fetchSkills.and.returnValue(of(expectedData));

    skillListResolverService.resolve(route, router).subscribe(value => {
      expect(value).toEqual(Right(expectedData));
    });
  });

  /*
    fit('should returned the error given by the skillsService', () => {
      const expectedData: DataServiceError = unavailableServiceError('rel1');
      skillsServiceSpy.fetchSkills.and.;

      skillListResolverService.resolve(route, router).subscribe(value => {
        expect(value).toEqual(Left(expectedData));
      });
    });

  */
});
