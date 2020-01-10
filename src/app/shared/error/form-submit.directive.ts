import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'form'
})
export class FormSubmitDirective {
  reset$ = fromEvent(this.element, 'reset').pipe(
    tap(() => {
      this.renderer.removeClass(this.host.nativeElement, 'submitted');
    }),
  );

  submit$ = fromEvent(this.element, 'submit').pipe(
    tap(() => {
      this.renderer.addClass(this.host.nativeElement, 'submitted');
    }),
    // if enabled the shareReplay will add the error on any field added dynamically after the attempt to submit has been done
    // shareReplay(1)
  );

  constructor(private host: ElementRef<HTMLFormElement>, private renderer: Renderer2) {
  }

  get element() {
    return this.host.nativeElement;
  }
}
