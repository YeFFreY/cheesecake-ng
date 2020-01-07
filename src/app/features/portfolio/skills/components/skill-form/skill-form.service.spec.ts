import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { SkillFormService } from './skill-form.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SkillFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ ReactiveFormsModule ],
    providers: [
      SkillFormService
    ]
  }));

  it('should be created', () => {
    const service: SkillFormService = TestBed.get(SkillFormService);
    expect(service).toBeTruthy();
  });

  it('should have empty data when no input given', () => {
    const service: SkillFormService = TestBed.get(SkillFormService);
    expect(service.to()).toEqual({
      name: '',
      description: ''
    });
  });

  it('should have data when input given', () => {
    const service: SkillFormService = TestBed.get(SkillFormService);
    const testData = {
      name: faker.name.title(),
      description: faker.lorem.paragraph()
    };
    service.from(testData);
    expect(service.to()).toEqual(testData);
  });

});
