import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillListComponent } from './skill-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { unavailableServiceError } from '../../../../../lib/services.utils';
import { SkillOverview } from '../services/skills.service';
import * as faker from 'faker';

const skills: SkillOverview[] = [
  { id: faker.random.number(), name: faker.name.title() }
];
const serviceError = unavailableServiceError('rel');

describe('SkillListComponent', () => {
  let component: SkillListComponent;
  let fixture: ComponentFixture<SkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillListComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ resolvedData: Right(skills) })
          }
        }
      ]
    })
      .compileComponents();
  }));

  const initComponent = () => {
    fixture = TestBed.createComponent(SkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create the component when the route data is a DataServiceError', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        data: of({ resolvedData: Left(serviceError) })
      }
    });
    initComponent();

    expect(component).toBeTruthy();
    expect(component.skills).toBeNull();
    expect(component.error).toEqual(serviceError);
  });

  it('should create the component when the route data is a list of skills', () => {
    initComponent();
    expect(component).toBeTruthy();
    expect(component.error).toBeNull();
    expect(component.skills).toEqual(skills);
  });

});
