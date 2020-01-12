import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCreateComponent } from './skill-create.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SkillsService } from '../services/skills.service';
import * as faker from 'faker';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('SkillCreateComponent', () => {
  let component: SkillCreateComponent;
  let fixture: ComponentFixture<SkillCreateComponent>;
  let skillsServiceSpy: jasmine.SpyObj<SkillsService>;
  let router: Router;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('SkillsService', [ 'createSkill' ]);
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SkillCreateComponent ],
      providers: [
        { provide: SkillsService, useValue: spy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // because we're not testing the nested components
    })
      .compileComponents();

    skillsServiceSpy = TestBed.get(SkillsService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call skills service when form submitted and then navigate to view', () => {
    const createdSkillId = 1;
    const testData = {
      name: faker.name.title(),
      description: faker.lorem.paragraph()
    };
    skillsServiceSpy.createSkill.and.returnValue(of({ id: createdSkillId, ...testData }));

    const navigateSpy = spyOn(router, 'navigate');
    const route = TestBed.get(ActivatedRoute);

    component.create(testData);

    expect(skillsServiceSpy.createSkill).toHaveBeenCalledWith(testData);
    expect(navigateSpy).toHaveBeenCalledWith([ `../${ createdSkillId }` ], { relativeTo: route });
  });
});
