import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cheeErrorContainer]'
})
export class ControlErrorContainerDirective {

  constructor(public vcr: ViewContainerRef) {
  }

}
