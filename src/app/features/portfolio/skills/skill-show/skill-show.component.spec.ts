import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillShowComponent } from './skill-show.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { Skill } from '../../../../domain/skill.model';
import * as faker from 'faker';
import { Page } from '@testing/page.utils';
import { invalidResourceIdError } from '@lib/services.utils';

const skill: Skill = {
  id: faker.random.number(), name: faker.name.title(), description: faker.lorem.paragraph()
};

const serviceError = invalidResourceIdError('invalidID');

class SkillShowPage extends Page<SkillShowComponent> {
  get error() {
    return this.query<HTMLElement>('p');
  }

  get skillName() {
    return this.query<HTMLElement>('h2');
  }

  get skillDescription() {
    return this.query<HTMLElement>('p');
  }
}

describe('SkillShowComponent', () => {
  let component: SkillShowComponent;
  let fixture: ComponentFixture<SkillShowComponent>;
  let page: SkillShowPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillShowComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ resolvedData: Right(skill) })
          }
        }
      ]
    })
      .compileComponents();
  }));

  const initComponent = () => {
    fixture = TestBed.createComponent(SkillShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new SkillShowPage(fixture);
  };

  it('should create the component when the route data is a DataServiceError', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        data: of({ resolvedData: Left(serviceError) })
      }
    });
    initComponent();

    expect(component).toBeTruthy();
    expect(component.skill).toBeNull();
    expect(component.error).toEqual(serviceError);
    expect(page.error.textContent).toEqual(serviceError.friendlyMessage);
  });

  it('should create the component when the route data is a skill', () => {
    initComponent();
    expect(component).toBeTruthy();
    expect(component.error).toBeNull();
    expect(component.skill).toEqual(skill);
  });

  it('should should display the skill', () => {
    initComponent();
    expect(page.skillName.textContent).toEqual(skill.name);
    expect(page.skillDescription.textContent).toEqual(skill.description);
  });
});
