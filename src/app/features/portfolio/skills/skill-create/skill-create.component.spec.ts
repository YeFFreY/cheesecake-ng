import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCreateComponent } from './skill-create.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SkillCreateComponent', () => {
  let component: SkillCreateComponent;
  let fixture: ComponentFixture<SkillCreateComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ SkillCreateComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] // because we're not testing the nested components
    })
      .compileComponents();
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
