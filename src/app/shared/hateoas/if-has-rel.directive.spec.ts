import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IfHasRelDirective } from './if-has-rel.directive';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'chee-test-component',
  template: `
    <div>
      <span *cheeIfHasRel="'rel'">test</span>
    </div>
  `
})
class TestComponent {
}

describe('IfHasRelDirective', () => {
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', [ 'hasRel' ]);

    TestBed.configureTestingModule({
      declarations: [ TestComponent, IfHasRelDirective ],
      providers: [
        { provide: ApiService, useValue: apiSpy }
      ]
    }).compileComponents();

    apiServiceSpy = TestBed.get(ApiService);
  });

  it('should display the test span when api tell rel is found ', () => {
    apiServiceSpy.hasRel.and.returnValue(of(true));
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('span'))).toBeTruthy();
  });

  it('should not display the test span when api tell rel is not found ', () => {
    apiServiceSpy.hasRel.and.returnValue(of(false));
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('span'))).toBeFalsy();
  });

});
