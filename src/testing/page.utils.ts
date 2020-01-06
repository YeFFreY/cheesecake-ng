import { ComponentFixture } from '@angular/core/testing';

export class Page<C> {
  private fixture: ComponentFixture<C>;

  constructor(fixture: ComponentFixture<C>) {
    this.fixture = fixture;
  }

  //// query helpers ////
  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  protected queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
