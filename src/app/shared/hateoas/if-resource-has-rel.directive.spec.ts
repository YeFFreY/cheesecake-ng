import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IfResourceHasRelDirective } from './if-resource-has-rel.directive';

@Component({
  selector: 'chee-visible-component',
  template: `
    <div>
      <span *cheeIfResourceHasRel="{resource: { id: 1, _links:[{rel: 'rel1', href: '/api/rel1'}]}, rel: 'rel1'}">test</span>
    </div>
  `
})
class VisibleSpanComponent {
}

@Component({
  selector: 'chee-invisible-component',
  template: `
    <div>
      <span *cheeIfResourceHasRel="{resource: { id: 1, _links:[{rel: 'rel1', href: '/api/rel1'}]}, rel: 'unknownRel'}">test</span>
    </div>
  `
})
class InVisibleSpanComponent {
}

describe('IfResourceHasRelDirective', () => {
  let fixture: ComponentFixture<VisibleSpanComponent>;
  let component: VisibleSpanComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ VisibleSpanComponent, InVisibleSpanComponent, IfResourceHasRelDirective ],
    }).compileComponents();

  });

  it('should display the test span when resource contains rel', () => {
    fixture = TestBed.createComponent(VisibleSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('span'))).toBeTruthy();
  });

  it('should not display the test span when resource does not contain rel', () => {
    fixture = TestBed.createComponent(InVisibleSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('span'))).toBeFalsy();
  });

});
