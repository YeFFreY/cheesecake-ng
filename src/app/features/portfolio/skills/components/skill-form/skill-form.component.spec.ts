import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFormComponent } from './skill-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Page } from '@testing/page.utils';
import { click } from '@testing/index';
import { SkillData } from '../../../../../domain/skill.model';
import * as faker from 'faker';

class SkillFormPage extends Page<SkillFormComponent> {
  get submitBtn() {
    return this.query<HTMLButtonElement>('button[type=submit]');
  }

  updateNameInput(value: any) {
    return this.updateFormInput('name', value);
  }

  updateDescriptionInput(value: any) {
    return this.updateFormInput('description', value);
  }

}

describe('SkillFormComponent', () => {
  let component: SkillFormComponent;
  let fixture: ComponentFixture<SkillFormComponent>;
  let page: SkillFormPage;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ SkillFormComponent ],
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new SkillFormPage(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send form data when submit clicked', (done) => {
    const expectedData: SkillData = {
      name: faker.name.title(),
      description: faker.lorem.paragraph()
    };
    component.formSubmitted.subscribe(
      (data: SkillData) => {
        expect(data).toEqual(expectedData);
        done();
      },
      () => {
        fail('Should have got a value from the form');
        done();
      });

    page.updateNameInput(expectedData.name);
    page.updateDescriptionInput(expectedData.description);

    click(page.submitBtn);

  });

});
