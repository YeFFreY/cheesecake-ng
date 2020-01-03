import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { SkillOverview, SkillsService } from './skills.service';
import { ApiService } from '../../../../services/api.service';
import { of } from 'rxjs';

describe('SkillsService', () => {
  let skillsService: SkillsService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [ 'get' ]);

    TestBed.configureTestingModule({
      providers: [
        SkillsService,
        { provide: ApiService, useValue: spy }
      ],
    });

    skillsService = TestBed.get(SkillsService);
    apiServiceSpy = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(skillsService).toBeTruthy();
  });

  it('should request the fetching of the skills', () => {
    const expectedData: SkillOverview[] = [
      { id: faker.random.number(), name: faker.name.title() },
      { id: faker.random.number(), name: faker.name.title() },
    ];
    apiServiceSpy.get.and.returnValue(of(expectedData));

    skillsService.fetchSkills().subscribe(data => {
      expect(data).toEqual(expectedData);
      expect(apiServiceSpy.get.calls.count()).toBe(1);
    });
  });

});
