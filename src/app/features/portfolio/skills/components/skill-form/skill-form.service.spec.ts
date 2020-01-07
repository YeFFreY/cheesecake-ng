import { TestBed } from '@angular/core/testing';

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
});
