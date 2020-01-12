import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEditComponent } from './skill-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { Skill } from '../../../../domain/skill.model';
import * as faker from 'faker';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SkillsService } from '../services/skills.service';
import { RouterTestingModule } from '@angular/router/testing';
import { invalidResourceIdError } from '@lib/services.utils';

const skill: Skill = {
  id: faker.random.number(), name: faker.name.title(), description: faker.lorem.paragraph()
};

const serviceError = invalidResourceIdError('invalidID');

describe('SkillEditComponent', () => {
  let component: SkillEditComponent;
  let fixture: ComponentFixture<SkillEditComponent>;
  let skillsServiceSpy: jasmine.SpyObj<SkillsService>;
  let router: Router;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('SkillsService', [ 'updateSkill' ]);
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SkillEditComponent ],
      providers: [
        { provide: SkillsService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ resolvedData: Right(skill) })
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // because we're not testing the nested components
    })
      .compileComponents();
    // don't use TestBed here, to be able to override data in each test when needed.
  }));

  const initComponent = () => {
    fixture = TestBed.createComponent(SkillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    skillsServiceSpy = TestBed.get(SkillsService);
    router = TestBed.get(Router);
  };

  it('should create', () => {
    initComponent();
    expect(component).toBeTruthy();
  });

  it('should call skills service when form submitted', () => {
    initComponent();
    const testData = {
      name: faker.name.title(),
      description: faker.lorem.paragraph()
    };
    const navigateSpy = spyOn(router, 'navigate');
    skillsServiceSpy.updateSkill.and.returnValue(of({}));

    const route = TestBed.get(ActivatedRoute);

    expect(component.skill).toEqual(skill);
    expect(component.error).toBeNull();

    component.update(testData);

    expect(skillsServiceSpy.updateSkill).toHaveBeenCalledWith(skill, testData);
    expect(navigateSpy).toHaveBeenCalledWith([ '..' ], { relativeTo: route });
  });

  fit('should display error if route input data is error', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        data: of({ resolvedData: Left(serviceError) }),
        snapshot: {}
      }
    });
    const testData = {
      name: faker.name.title(),
      description: faker.lorem.paragraph()
    };
    initComponent();

    component.update(testData); // should do nothing

    expect(skillsServiceSpy.updateSkill).toHaveBeenCalledTimes(0);
    expect(component.skill).toBeNull();
    expect(component.error).toEqual(serviceError);
  });
});
