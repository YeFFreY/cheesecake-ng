import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFormComponent } from './skill-form.component';
import { FormBuilder } from '@angular/forms';
import { SkillFormService } from './skill-form.service';

describe('SkillFormComponent', () => {
  let component: SkillFormComponent;
  let fixture: ComponentFixture<SkillFormComponent>;
  let formServiceSpy: jasmine.SpyObj<SkillFormService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('SkillFormService', [ '' ]);

    TestBed.configureTestingModule({
      declarations: [ SkillFormComponent ],
      providers: [
        FormBuilder,
        { provide: SkillFormService, useValue: spy }
      ],

    })
      .compileComponents();
    formServiceSpy = TestBed.get(SkillFormService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
