import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillListComponent } from './skill-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { unavailableServiceError } from '@lib/services.utils';
import { SkillOverview } from '../services/skills.service';
import * as faker from 'faker';
import { Page } from '@testing/page.utils';
import { RouterTestingModule } from '@angular/router/testing';

const skills: SkillOverview[] = [
  { id: faker.random.number(), name: faker.name.title() },
  { id: faker.random.number(), name: faker.name.title() },
  { id: faker.random.number(), name: faker.name.title() }
];
const serviceError = unavailableServiceError('rel');

class SkillListPage extends Page<SkillListComponent> {
  get error() {
    return this.query<HTMLElement>('p');
  }

  get skills() {
    return this.queryAll<HTMLElement>('.skill-item');
  }

  get skillNames() {
    return this.queryAll<HTMLElement>('.skill-item > h4');
  }
}

describe('SkillListComponent', () => {
  let component: SkillListComponent;
  let fixture: ComponentFixture<SkillListComponent>;
  let page: SkillListPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SkillListComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ resolvedData: Right(skills) }),
            snapshot: {}
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
    page = new SkillListPage(fixture);
  };

  it('should create the component when the route data is a DataServiceError', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        data: of({ resolvedData: Left(serviceError) }),
        snapshot: {}
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

  it('should should display the list of given skills', () => {
    initComponent();
    const skillElements = page.skills;
    const skillNames = Array.from(page.skillNames);
    expect(skillElements.length).toBe(skills.length);
    expect(skillNames.map(i => i.textContent)).toEqual(skills.map(i => i.name));
  });
});
