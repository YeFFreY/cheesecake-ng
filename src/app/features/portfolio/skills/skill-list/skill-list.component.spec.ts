import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillListComponent } from './skill-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Left, Right } from 'purify-ts/Either';
import { unavailableServiceError } from '../../../../../lib/services.utils';
import { SkillOverview } from '../services/skills.service';
import * as faker from 'faker';

const skills: SkillOverview[] = [
  { id: faker.random.number(), name: faker.name.title() },
  { id: faker.random.number(), name: faker.name.title() },
  { id: faker.random.number(), name: faker.name.title() }
];
const serviceError = unavailableServiceError('rel');

class Page {
  private fixture: ComponentFixture<SkillListComponent>;

  constructor(fixture: ComponentFixture<SkillListComponent>) {
    this.fixture = fixture;
  }

  get error() {
    return this.query<HTMLElement>('p');
  }

  get skills() {
    return this.queryAll<HTMLElement>('.skill-item');
  }

  get skillNames() {
    return this.queryAll<HTMLElement>('.skill-item > h4');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

describe('SkillListComponent', () => {
  let component: SkillListComponent;
  let fixture: ComponentFixture<SkillListComponent>;
  let page: Page;

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
    page = new Page(fixture);
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

  it('should should display the list of given skills', () => {
    initComponent();
    const skillElements = page.skills;
    const skillNames = Array.from(page.skillNames);
    expect(skillElements.length).toBe(skills.length);
    expect(skillNames.map(i => i.textContent)).toEqual(skills.map(i => i.name));
  });
});
