import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCreateComponent } from './skill-create.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SkillFormService } from '../components/skill-form/skill-form.service';

describe('SkillCreateComponent', () => {
  let component: SkillCreateComponent;
  let fixture: ComponentFixture<SkillCreateComponent>;
  let formServiceSpy: jasmine.SpyObj<SkillFormService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('SkillFormService', [ '' ]);

    TestBed.configureTestingModule({
      declarations: [ SkillCreateComponent ],
      providers: [
        { provide: SkillFormService, useValue: spy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // because we're not testing the nested components
    })
      .compileComponents();
    formServiceSpy = TestBed.get(SkillFormService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
