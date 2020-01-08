import { ComponentFixture } from '@angular/core/testing';
import { newEvent } from './index';

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

  protected queryFormInput(name: string) {
    return this.query<HTMLInputElement>(`input[name="${ name }"]`);
  }

  protected updateFormInput(name: string, value: any) {
    const formInput = this.queryFormInput(name);
    if (!formInput) {
      console.error(`Unable to update form input with name [${ name }], field not found !`);
      return;
    }
    formInput.value = value;
    formInput.dispatchEvent(newEvent('input'));
  }
}
